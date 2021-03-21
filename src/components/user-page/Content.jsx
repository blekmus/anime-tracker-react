/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { v4 as uuid } from 'uuid'

import Card from './Card'

const USER_DATA = gql`
query($userName: String, $format: MediaType, $sortType: [MediaListSort], $status: MediaListStatus) {
  MediaListCollection(userName: $userName, type: $format, sort: $sortType, status: $status) {
    lists {
      name
      entries {
        score
        progress
        media {
          coverImage {
            large
          }
          title {
            romaji
            english
          }
          siteUrl
          format
          status
          episodes
          chapters
          seasonYear
          startDate {
            year
          }
          staff {
            edges {
              role
              node {
                siteUrl
                name {
                  full
                }
              }
            }
          }
          studios {
            edges {
              isMain
              node {
                siteUrl
                name
              }
            }
          }
        }
      }
    }
  }
}`

function Content({
  user,
  format,
  status,
  view,
  order,
  sort,
}) {
  let sortType
  let cards

  const history = useHistory()

  // grid cont
  const gridStyles = css`
    max-width: 1300px;
    width: 85%;
    margin: 0 auto 50px auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px 20px;
    justify-content: space-between;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    /* mobile */
    @media (max-width: 640px) {
      width: 92%;
      gap: 15px 10px;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
  `

  // list cont
  const listStyles = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 0px 20px;
    width: 85%;
    max-width: 1300px;
    margin: 0 auto 50px auto;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;
      display: flex;
      flex-direction: column;
    }

    /* mobile */
    @media (max-width: 640px) {
      width: 92%;
      display: flex;
      flex-direction: column;
    }
  `

  // no cards fallback styles
  const emptyStyles = css`
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 4rem;
      font-family: 'Overpass', sans-serif;
      font-weight: 400;
      color: #739dc238;
    }

    h2 {
      font-size: 0.9rem;
      font-family: 'Overpass', sans-serif;
      font-weight: 600;
      color: #739dc26e;
    }

    /* mobile */
    @media (max-width: 640px) {
      h1 {
        font-size: 3rem;
      }

      h2 {
        font-size: 0.7rem;
      }
    }
  `

  // function to handle gql errors
  const handleErrors = (e) => {
    if (e.graphQLErrors) {
      e.graphQLErrors.forEach((error) => {
        if (error.status === 404) {
          history.replace('/')
        }
      })
    } else {
      e.networkErrors.forEach((error) => {
        console.log(error)
      })
    }
  }

  // resolve sort type
  switch (sort) {
    case 'Alphabetic':
      sortType = 'MEDIA_TITLE_ENGLISH'
      break

    case 'Ratings':
      sortType = 'SCORE'
      break

    case 'Popularity':
      sortType = 'MEDIA_POPULARITY'
      break

    // most recent
    default:
      if (status === 'current') {
        sortType = 'UPDATED_TIME'
      } else if (status === 'completed') {
        sortType = 'FINISHED_ON'
      } else if (status === 'planning') {
        sortType = 'ADDED_TIME'
      } else if (status === 'paused') {
        sortType = 'UPDATED_TIME'
      }
      break
  }

  // bring in user data
  const { data: userData } = useQuery(USER_DATA, {
    onError: handleErrors,
    variables: {
      userName: user,
      format: format.toUpperCase(),
      sortType,
      status: status.toUpperCase(),
    },
  })

  if (userData) {
    if (userData.MediaListCollection.lists.length === 0) {
      return (
        <div css={emptyStyles}>
          <h1>¯\_(ツ)_/¯</h1>
          <h2>Ah! My best friend, the void</h2>
        </div>
      )
    }

    let entries
    entries = [...userData.MediaListCollection.lists[0].entries]

    // to counter a bug with the query
    // both MEDIA_TITLE_ENGLISH and MEDIA_TITLE_ENGLISH_DESC
    // return the same output
    if (sort === 'Alphabetic') {
      entries = entries.reverse()
    }

    if (order === 'ascending') {
      cards = entries.map((entry) => (
        <Card entry={entry} view={view} key={uuid()} status={status} format={format} />
      ))
    } else {
      const reversedEntries = entries.reverse()

      cards = reversedEntries.map((entry) => (
        <Card entry={entry} view={view} key={uuid()} status={status} format={format} />
      ))
    }
  }

  return (
    <div css={view === 'grid' ? gridStyles : listStyles}>{cards}</div>
  )
}

Content.propTypes = {
  user: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
}

export default Content
