/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import FavsCard from './FavsCard'
import StatsCard from './StatsCard'

import colors from '../../assets/general/colors'

// https://www.npmjs.com/package/react-lazy-load-image-component

const USER_BY_NAME = gql`
query ($userName: String) { 
  User (name: $userName) {
    id
    name
    avatar {
      large
    }
    bannerImage
  }
}`

function Header({
  user,
  format: [format, setFormat],
  status: [status, setStatus],
}) {
  const history = useHistory()

  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const [favsPopup, setFavsPopup] = useState(false)
  const [statsPopup, setStatsPopup] = useState(false)

  const styles = css`
    .search {
      position: absolute;
      width: 100%;
      height: 100px;
      padding-top: 10px;
      padding-left: 20px;
      z-index: 1;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.49) 0%, rgba(0, 0, 0, 0) 100%);

      a {
        transition: color 0.3s ease;
        text-decoration: none;
        color: white;
        font-weight: 700;
        font-family: 'Overpass', sans-serif;

        &:hover {
          color: ${colors.secondaryAccent};
        }
      }
    }

    .banner {
      background-position: 50% 35%;
      background-repeat: no-repeat;
      background-size: cover;
      height: 300px;
      opacity: 0;
      transition: opacity 2s ease;
    }

    .main-card {
      background-color: #151f2e;
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;

      .avatar-formats {
        display: flex;
        column-gap: 20px;
        margin-bottom: 70px;
      }

      .avatar {
        height: 200px;
        margin-top: -100px;
        position: relative;

        .avatar-preloader {
          height: 100%;
          background-color: #2d405d;
          border-radius: 4px;
          width: 170px;
          display: flex;
          justify-content: center;
          align-items: center;

          &.hide {
            opacity: 0;
          }
        }

        img {
          transition: opacity 0.2s ease;
          opacity: 0;
          max-width: 170px;
          position: absolute;
          border-radius: 5px;
          height: 100%;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          object-fit: cover;
        }

        h2 {
          margin-top: 8px;
          text-align: center;
          font-family: 'Overpass', sans-serif;
          font-weight: 700;
          color: white;
        }

        .loading-icon {
          height: 20px;
          fill: white;
        }
      }

      .format-btn {
        height: 30px;
        margin-top: 10px;
        border: none;
        background: none;
        cursor: pointer;

        &.active {
          cursor: default;

          p {
            color: ${colors.primaryAccent};

            &:hover {
              color: ${colors.primaryAccent};
            }
          }

          .line {
            opacity: 1;
            width: 100%;
          }
        }

        p {
          padding: 0 2px;
          text-align: center;
          font-size: 1.3rem;
          font-weight: 400;
          color: #ABABAB;
          font-family: 'Source Sans Pro', sans-serif;
          transition: color 0.3s ease;

          &:hover {
            color: #DFDFDF;
          }
        }

        .line {
          border-radius: 50px;
          height: 3px;
          width: 90%;
          background-color: ${colors.primaryAccent};
          opacity: 0;
          transition: background-color 0.3s ease, width 0.3s ease;
          margin: 0 auto;
        }
      }

      .additional-btns {
        position: absolute;
        top: 10px;
        right: 15px;
        display: flex;
        column-gap: 10px;

        button {
          cursor: pointer;
          background-color: #1F2B38;
          display: flex;
          border: none;
          padding: 8px 10px;
          border-radius: 3px;
          align-items: center;
          column-gap: 10px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #22303f;
          }

          svg {
            height: 18px;
          }

          p {
            text-align: center;
            font-size: 1rem;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 600;
            color: #8596A5;
          }
        }
      }

      .status-cont {
        display: flex;
        /* column-gap: 10px; */

        button {
          letter-spacing: 0.3px;
          background: none;
          border: none;
          padding: 7px 20px;
          color: #8596A5;
          font-weight: 600;
          font-size: 1.1rem;
          font-family: 'Source Sans Pro', sans-serif;
          cursor: pointer;
          border-radius: 3px 3px 0 0;
          transition: color 0.3s ease;

          &:hover {
            color: #6BA6C6;
          }

          &.active {
            background-color: #1d2a3b;
            color: #6BA6C6;
            cursor: default;
          }
        }
      }
    }

    /* laptop */
    @media (min-width: 800px) and (max-width: 1000px) {
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      .banner {
        height: 240px;
      }

      .main-card {
        .avatar-formats {
          margin-bottom: 50px
        }

        .avatar {
          height: 170px;
          margin-top: -90px;
          
          .avatar-preloader {
            width: 150px;
          }

          img {
            max-width: 150px;
          }

          h2 {
            font-size: 1.3rem;
          }
        }

        .format-btn {
          p {
            font-size: 1.2rem;
          }
        }

        .additional-btns {
          position: initial;
          margin-bottom: 20px;
        }

        .status-cont {
          button {
            font-size: 1.05rem;
          }
        }

      }
    }

    /* mobile */
    @media (max-width: 640px) {
      .search {
        height: 60px;
      }

      .banner {
        height: 190px;
      }

      .main-card {
        .avatar-formats {
          margin-bottom: 50px;
          width: 100%;
          justify-content: space-evenly;
          column-gap: 0;
        }

        .avatar {
          height: 150px;
          margin-top: -70px;
          
          .avatar-preloader {
            width: 130px;
          }

          img {
            max-width: 130px;
          }

          h2 {
            font-size: 1.3rem;
          }
        }

        .format-btn {
          p {
            font-size: 1.2rem;
          }
        }

        .additional-btns {
          position: initial;
          margin-bottom: 30px;
  
          button {

            p {
              display: none;
            }

            svg {
              height: 20px;
            }
          }
        }

        .status-cont {
          width: 100%;
          justify-content: space-evenly;

          button {
            font-size: 0.95rem;
            width: 100%;
            padding: 0;
            height: 35px;
          }
        }

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

  // fetch user data
  const { data: userData } = useQuery(USER_BY_NAME, {
    onError: handleErrors,
    variables: {
      userName: user,
    },
  })

  // status menu buttons
  const statusBtns = (
    <>
      <button
        type="button"
        className={(status === 'current') ? 'active' : null}
        onClick={() => setStatus('current')}
      >
        {(format === 'anime' ? 'Watching' : 'Reading')}
      </button>

      <button
        type="button"
        className={(status === 'completed') ? 'active' : null}
        onClick={() => setStatus('completed')}
      >
        Completed
      </button>

      <button
        type="button"
        className={(status === 'planning') ? 'active' : null}
        onClick={() => setStatus('planning')}
      >
        Planning
      </button>

      <button
        type="button"
        className={(status === 'paused') ? 'active' : null}
        onClick={() => setStatus('paused')}
      >
        Paused
      </button>
    </>
  )

  // loading icon for user
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
      <div className="search">
        <Link to="/">SEARCH</Link>
      </div>

      <div
        className="banner"
        style={
          userData ? {
            backgroundImage: `url(${userData.User.bannerImage})`,
            opacity: 1,
          } : null
        }
      />

      <div className="main-card">

        <div className="avatar-formats">
          <button className={`format-btn ${(format === 'anime') ? 'active' : null}`} type="button" onClick={() => setFormat('anime')}>
            <p>Anime</p>
            <div className="line" />
          </button>
          <div className="avatar">
            <img src={userData ? userData.User.avatar.large : null} alt="" onLoad={() => { setAvatarLoaded(true) }} style={avatarLoaded ? { opacity: 1 } : null} />
            <div className={`avatar-preloader ${avatarLoaded ? 'hide' : null}`} />
            <h2>{userData ? userData.User.name : loadingIcon}</h2>
          </div>
          <button className={`format-btn ${(format === 'manga') ? 'active' : null}`} type="button" onClick={() => setFormat('manga')}>
            <p>Manga</p>
            <div className="line" />
          </button>
        </div>

        <div className="additional-btns">
          <button className="stats-btn" type="button" onClick={() => setStatsPopup(true)}>
            <svg viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.25 10.9979H1.03745C0.467155 10.9979 0.00606695 11.4431 0 11.9996V26.9954C0 27.5519 0.467155 27.9971 1.03745 27.9971H7.25C7.82636 27.9971 8.28745 27.546 8.28745 26.9954V11.9996C8.28745 11.4431 7.82029 10.9979 7.25 10.9979Z" fill="#D878CB" fillOpacity="0.8" />
              <path d="M17.6063 0.00292969H11.3938C10.8235 0.00292969 10.3563 0.448118 10.3563 0.998746V26.9954C10.3563 27.5519 10.8235 27.9971 11.3938 27.9971H17.6063C18.1827 27.9971 18.6438 27.546 18.6438 26.9954V1.0046C18.6438 0.448118 18.1766 0.00292969 17.6063 0.00292969Z" fill="#D878CB" fillOpacity="0.8" />
              <path d="M27.9625 7.99878H21.75C21.1736 7.99878 20.7125 8.44397 20.7125 9.00045V26.9954C20.7125 27.5519 21.1797 27.9971 21.75 27.9971H27.9625C28.5389 27.9971 29 27.5461 29 26.9954V9.00045C29 8.44397 28.5328 7.99878 27.9625 7.99878Z" fill="#D878CB" fillOpacity="0.8" />
            </svg>
            <p>Stats</p>
          </button>

          <button className="favs-btn" type="button" onClick={() => setFavsPopup(true)}>
            <svg viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8942 2.2927C16.9241 2.20057 17.0545 2.20057 17.0844 2.29271L20.5567 12.9792C20.5701 13.0205 20.6085 13.0483 20.6518 13.0483H31.8883C31.9852 13.0483 32.0254 13.1723 31.9471 13.2292L22.8566 19.8339C22.8215 19.8594 22.8068 19.9045 22.8202 19.9457L26.2925 30.6322C26.3224 30.7244 26.217 30.801 26.1386 30.744L17.0481 24.1394C17.013 24.1139 16.9656 24.1139 16.9305 24.1394L7.84002 30.744C7.76165 30.801 7.6562 30.7244 7.68614 30.6322L11.1584 19.9457C11.1718 19.9045 11.1571 19.8594 11.1221 19.8339L2.03156 13.2292C1.95319 13.1723 1.99347 13.0483 2.09034 13.0483H13.3268C13.3702 13.0483 13.4086 13.0205 13.4219 12.9792L16.8942 2.2927Z" fill="#B269AD" stroke="#B269AD" strokeWidth="3" />
            </svg>
            <p>Favs</p>
          </button>
        </div>

        <div className="status-cont">
          {statusBtns}
        </div>
      </div>

      {favsPopup ? <FavsCard visibility={setFavsPopup} user={user} /> : null}
      {statsPopup ? <StatsCard visibility={setStatsPopup} user={user} /> : null}
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  format: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  ).isRequired,
  status: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  ).isRequired,
}

export default Header
