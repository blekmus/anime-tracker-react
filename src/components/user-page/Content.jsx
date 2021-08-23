/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState, useMemo } from 'react'
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
  const history = useHistory()
  const [queryData, setQueryData] = useState({})

  // parent styles
  const contStyles = css`
    max-width: 1300px;
    width: 85%;
    margin: 0 auto 50px auto;

    .entry-list-title {
      margin-left: 10px;
      margin-bottom: 10px;
      font-weight: 700;
      font-family: 'Overpass', sans-serif;
      font-size: 1.4rem;
      color: #808a93;
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;
    }
    /* mobile */
    @media (max-width: 640px) {
      width: 92%;
    }
  `

  // grid cont
  const gridStyles = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px 20px;
    justify-content: space-between;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    /* mobile */
    @media (max-width: 640px) {
      gap: 15px 10px;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
  `

  // list cont
  const listStyles = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 0px 20px;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }

    /* mobile */
    @media (max-width: 640px) {
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

  const listCards = useMemo(() => {
    if (!queryData.MediaListCollection) {
      return 'Loading'
    }

    if (queryData.MediaListCollection.lists.length === 0) {
      return (
        <div css={emptyStyles}>
          <h1>¯\_(ツ)_/¯</h1>
          <h2>Ah! My best friend, the void</h2>
        </div>
      )
    }

    // let entryLists
    const entryLists = [...queryData.MediaListCollection.lists]

    let defaultLists = []
    const userLists = []

    // loop through all lists and append the to default and user
    entryLists.forEach((entryList) => {
      let cardData = [...entryList.entries]

      // to counter a bug with the api
      // both MEDIA_TITLE_ENGLISH and MEDIA_TITLE_ENGLISH_DESC
      // return the same response
      if (sort === 'Alphabetic') {
        cardData = cardData.reverse()
      }

      if (order !== 'ascending') {
        cardData = cardData.reverse()
      }

      const cardList = cardData.map((entry) => (
        <Card entry={entry} view={view} key={uuid()} status={status} format={format} />
      ))

      // check if list is default or not
      if (['reading', 'watching', 'completed', 'planning', 'paused'].includes(entryList.name.toLowerCase())) {
        defaultLists.push(cardList)
      } else {
        userLists.push((
          <div css={contStyles} key={uuid()}>
            <h1 className="entry-list-title">{entryList.name}</h1>
            <div css={view === 'grid' ? gridStyles : listStyles}>
              {cardList}
            </div>
          </div>
        ))
      }
    })

    defaultLists = (
      <div css={contStyles} key={uuid()}>
        <div css={view === 'grid' ? gridStyles : listStyles}>
          {defaultLists.flat(1)}
        </div>
      </div>
    )

    // have the defaults uptop and user lists down bottom
    return (
      <>
        {defaultLists}
        {userLists}
      </>
    )
  }, [queryData, order, view])

  // bring in user data and set to state
  useQuery(USER_DATA, {
    onError: handleErrors,
    onCompleted: (data) => setQueryData(data),
    variables: {
      userName: user,
      format: format.toUpperCase(),
      sortType,
      status: status.toUpperCase(),
    },
  })

  return (
    <>{listCards}</>
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
