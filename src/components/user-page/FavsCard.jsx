/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import colors from '../../assets/general/colors'

const USER_FAVS = gql`
query ($userName: String) { 
  User (name: $userName) {
    id
    favourites {
      anime {
        nodes {
          title {
            romaji
          }
          siteUrl
          coverImage {
            medium
          }
        }
      }
      manga {
        nodes {
          title {
            romaji
          }
          siteUrl
          coverImage {
            medium
          }
        }
      }
      characters {
        nodes {
          name {
            full
          }
          siteUrl
          image {
            medium
          }
        }
      }
    }
  }
}`

function FavsCard({ visibility: setFavsPopup, user }) {
  const styles = css`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    .back {
      background: #000000d6;
      height: 100%;
    }

    .overlay-cont {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 5%;
      margin: auto;
      width: 80%;
      max-width: 1000px;
      height: 80%;

      .top {
        position: relative;

        h1 {
          margin-left: 10px;
          margin-bottom: 2px;
          font-weight: 700;
          font-family: 'Overpass', sans-serif;
          font-size: 1.4rem;
          color: white;
        }

        button {
          position: absolute;
          top: 0;
          right: 5px;
          bottom: 0;
          height: 100%;
          background: none;
          border: none;
          height: 17px;
          margin: auto 0;
          cursor: pointer;
          padding: 0 10px;

          &:hover {
            svg {
              fill: #c54848;
            }
          }

          svg {
            transition: fill 0.3s ease;
            fill: #FF7A7A;
            height: 100%;
          }
        }
      }

      .overlay {
          background-color: #0B1622;
          border-radius: 4px;
          height: 100%;
          overflow: auto;

          /* Works on Firefox */
            scrollbar-color: #2c384a transparent;

          /* Works on Chrome, Edge, and Safari */
          &::-webkit-scrollbar {
            height: 15px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #2c384a;
          }

          .scrollable {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 1fr 1fr;
            grid-gap: 10px 0;
            padding: 15px 30px 20px 30px;
            min-height: 500px;
          }
      }
    }

    .section {
      overflow: hidden;
      display: grid;
      grid-template-rows: 23px auto;
      /* https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items */

      p {
        color: ${colors.primaryAccent};
        font-family: 'Overpass', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        margin-left: 8px;
      }

      .card-cont {
        overflow-y: hidden;
        height: 100%;
        background-color: #151F2E; 
        border-radius: 3px;
        padding: 8px 10px;
        align-items: center;
        display: flex;
        column-gap: 15px;

        /* https://www.digitalocean.com/community/tutorials/css-scrollbars */

        /* Works on Firefox */
        scrollbar-width: thin;
        scrollbar-color: #2c384a transparent;
        &:hover {
          scrollbar-color: ${colors.secondaryAccent} transparent;
        }

        /* Works on Chrome, Edge, and Safari */
        &::-webkit-scrollbar {
          height: 7px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #2c384a;
        }
        &:hover::-webkit-scrollbar-thumb {
          background-color: ${colors.secondaryAccent};
        }

        button {
          cursor: pointer;
          display: contents;

          &:hover img {
            filter: brightness(65%);
          }

          img {
            border-radius: 3px;
            height: 100%;
            transition: filter 0.3s ease;
          }
        }
      }
    }

    .loading-icon {
      height: 50px;
      position: absolute;
      top: 40px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      fill: white;
    }

    /* mobile */
    @media (max-width: 640px) {
      .overlay-cont {
        width: 90%;

        .overlay {
          .scrollable {
            padding: 10px 15px 20px 15px;
          }
        }
      }
    }
  `
  // to change page if gql request returns 404
  const history = useHistory()

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

  // request to bring in user's favourites data
  const { data: userData, loading } = useQuery(USER_FAVS, {
    onError: handleErrors,
    variables: {
      userName: user,
    },
  })

  // fav sections and image cards
  const Content = () => {
    // anime favs
    const animeListData = userData.User.favourites.anime.nodes
    const animeList = animeListData.map((entry) => (
      <button key={uuid()} type="button" onClick={() => { window.open(entry.siteUrl, '_blank') }}>
        <img src={entry.coverImage.medium} alt={entry.title.romaji.toLowerCase()} />
      </button>
    ))

    // manga favs
    const mangaListData = userData.User.favourites.manga.nodes
    const mangaList = mangaListData.map((entry) => (
      <button key={uuid()} type="button" onClick={() => { window.open(entry.siteUrl, '_blank') }}>
        <img src={entry.coverImage.medium} alt={entry.title.romaji} />
      </button>
    ))

    // character favs
    const charListData = userData.User.favourites.characters.nodes
    const charList = charListData.map((entry) => (
      <button key={uuid()} type="button" onClick={() => { window.open(entry.siteUrl, '_blank') }}>
        <img src={entry.image.medium} alt={entry.name.full} />
      </button>
    ))

    return (
      <>
        <div className="section">
          <p>Anime</p>
          <div className="card-cont">{animeList}</div>
        </div>

        <div className="section">
          <p>Manga</p>
          <div className="card-cont">{mangaList}</div>
        </div>

        <div className="section">
          <p>Characters</p>
          <div className="card-cont">{charList}</div>
        </div>
      </>
    )
  }

  // loading animation
  const loadingIcon = (
    <svg
      className="loading-icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 50 50"
      xmlSpace="preserve"
    >
      <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )

  return (
    <div css={styles}>
      <div className="overlay-cont">
        <div className="top">
          <h1>Favs</h1>
          <button type="button" onClick={() => setFavsPopup(false)}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8323 10.0163L19.6199 2.22846C20.1267 1.7219 20.1267 0.902849 19.6199 0.396282C19.1133 -0.110284 18.2943 -0.110284 17.7877 0.396282L9.99989 8.18412L2.21229 0.396282C1.70548 -0.110284 0.88667 -0.110284 0.380103 0.396282C-0.126701 0.902849 -0.126701 1.7219 0.380103 2.22846L8.16771 10.0163L0.380103 17.8041C-0.126701 18.3107 -0.126701 19.1298 0.380103 19.6363C0.632556 19.889 0.964494 20.016 1.29619 20.016C1.62789 20.016 1.9596 19.889 2.21229 19.6363L9.99989 11.8485L17.7877 19.6363C18.0404 19.889 18.3721 20.016 18.7038 20.016C19.0355 20.016 19.3672 19.889 19.6199 19.6363C20.1267 19.1298 20.1267 18.3107 19.6199 17.8041L11.8323 10.0163Z" />
            </svg>
          </button>
        </div>
        <div className="overlay">
          <div className="scrollable">{loading ? loadingIcon : <Content />}</div>
        </div>
      </div>

      <div
        className="back"
        onClick={() => setFavsPopup(false)}
        role="switch"
        aria-checked={false}
        tabIndex={0}
        aria-label="popup close"
        onKeyPress={null}
      />
    </div>
  )
}

FavsCard.propTypes = {
  visibility: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}

export default FavsCard
