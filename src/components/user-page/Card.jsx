/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/opacity.css'
import colors from '../../assets/general/colors'

function Card({
  entry,
  view,
  status,
  format,
}) {
  let title

  // if english title is missing use romaji
  if (!entry.media.title.english) {
    title = entry.media.title.romaji
  } else {
    title = entry.media.title.english
  }

  // grid card
  if (view === 'grid') {
    const styles = css`
      border: none;
      background-color: #151f2e;
      display: grid;
      cursor: pointer;
      grid-template-rows: auto 45px;
      border-radius: 4px;
      padding: 12px 12px 8px 12px;
      box-shadow: 0 14px 30px rgba(0,5,15,0.15),0 4px 4px rgba(0,5,15,0.05);

      &:hover {
        h3 {
          color: ${colors.primaryAccent};
        }
      }

      .img-cont {
        background-color: #2d405d;
        border-radius: 4px 4px 0 0;
        height: 100%;

        span {
          overflow: hidden;
          border-radius: 4px 4px 0 0;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      h3 {
        text-decoration: none;
        font-weight: 600;
        line-height: 20px;
        margin-top: 8px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-family: 'Overpass', sans-serif;
        color: #6c7784;
        font-size: 0.95rem;
        transition: 0.14s ease;
        text-align: left;
        max-lines: 2;
        transition: color 0.3s ease;
      }

      /* mobile */
      @media (max-width: 640px) {
        padding: 5px;

        h3 {
          text-align: center;
          font-size: 0.9rem;
        }
      }
    `

    return (
      <button css={styles} type="button" onClick={() => { window.open(entry.media.siteUrl, '_blank') }}>
        <div className="img-cont">
          <LazyLoadImage
            src={entry.media.coverImage.large}
            alt={title.toLowerCase()}
            effect="opacity"
          />
        </div>
        <h3>{title}</h3>
      </button>
    )
  }

  // list card
  if (view === 'list') {
    const styles = css`
      display: flex;
      padding: 0;
      background: linear-gradient(to top, #151f2e, #151f2e);
      margin: 10px 0;
      border-radius: 4px;
      height: 150px;
      box-shadow: 0 14px 30px rgba(0,5,15,.15),0 4px 4px rgba(0,5,15,.05);
      
      .image-cont {
        background-color: #2d405d;
        border-radius: 4px 0 0 4px;

        span {
          overflow: hidden;
          border-radius: 4px 0 0 4px;
          height: 100%;
          width: 120px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .info {
        display: flex;
        width: 100%;
        flex-direction: column;

        .main-info {
          padding: 15px 20px 0 20px;
          height: 65%;

          h1 {
            line-height: 19px;
            font-weight: 600;
            line-height: 20px;
            font-family: 'Overpass', sans-serif;
            color: #6c7784;
            font-size: 1.3rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            width: 100%;
          }

          a {
            font-size: 1.2rem;
            font-weight: 700;
            font-family: 'Source Sans Pro', sans-serif;
            color: #d878cb;
            text-decoration: none;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            width: 100%;
          }
        }

        .sub-info {
          height: 35%;
          display: flex;
          background-color: #131b28;
          align-items: center;
          border-radius: 0 0 4px 0;
          
          .left {
            width: 25%;
          }

          .sep {
            width: 3px;
            height: 40%;
            background-color: #3db4f2;
            border-radius: 50px;
          }

          .right {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            margin-top: 5px;

            h2 {
              font-family: 'Overpass', sans-serif;
              color: #6c7784;
              font-size: 1.13rem;
              font-weight: 400;
            }
          }
        }
      }

      .progress {
        display: flex;
        column-gap: 4px;
        justify-content: center;

        p {
          margin-top: 5px;
          font-family: 'Overpass', sans-serif;
          color: #6c7784;
          font-size: 1rem;
          font-weight: 700;
          text-align: center;

          &.current {
            color: #bbbbbb;
          }
        }
      }

      .rating {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 18px;
          margin-top: 2px;
        }

        p {
          font-family: 'Overpass', sans-serif;
          color: #6c7784;
          font-size: 1.1rem;
          font-weight: 400;
          margin-top: 7px;
          margin-left: 10px;
        }
      }

      /* tablet */
      @media (min-width: 640px) and (max-width: 800px) {
        .info {
          .sub-info {
            .right {
              h2 {
                font-size: 1.1rem;
              }
            }
          }
        }

        .progress {
          p {
            font-size: 0.9rem;
          }
        }

        .rating {
          p {
            font-size: 1.05rem;
            margin-left: 5px;
          }
        }
      }
  
      /* mobile */
      @media (max-width: 640px) {
        height: 120px;
        position: relative;

        .image-cont {
          span {
            width: 90px;
          }
        }

        .info {
          .main-info {
            height: 70%;
            padding-left: 8px;
            padding-top: 10px;
            padding-right: 40px;

            h1 {
              font-size: 1rem;
              font-weight: 700;
              line-height: 18px;
            }

            a {
              font-size:0.98rem;
            }
          }

          .sub-info {
            height: 30%;

            .left {
              display: none;
            }

            .sep {
              display: none;
            }

            .right {
              margin-top: 4px;

              h2 {
                font-size: 0.9rem;
                font-weight: 600;
              }
            }
          }
        }
      }
    `

    // desktop current anime & manga progress el
    const CurrentProgress = () => {
      let progress
      if (format === 'anime') {
        progress = (
          <div className="progress">
            <p className="current">{`ep. ${entry.progress}`}</p>
            <div className="line">
              <p>{' / '}</p>
            </div>
            <p>{`${entry.media.episodes}`}</p>
          </div>
        )
      } else {
        progress = (
          <div className="progress">
            <p className="current">{`ch. ${entry.progress}`}</p>
            {entry.media.chapters
              ? (
                <>
                  <div className="line">
                    <p>{' / '}</p>
                  </div>
                  <p className="total">{`${entry.media.chapters}`}</p>
                </>
              )
              : null}
          </div>
        )
      }

      return (
        <div className="left">
          <div className="progress">
            {progress}
          </div>
        </div>
      )
    }

    // desktop rating el
    const Rating = () => (
      <div className="left">
        <div className="rating">
          <svg viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7306 2.16374C16.7606 2.07161 16.8909 2.07161 16.9209 2.16374L20.3931 12.8503C20.4065 12.8915 20.4449 12.9194 20.4882 12.9194H31.7247C31.8216 12.9194 31.8619 13.0433 31.7835 13.1003L22.693 19.7049C22.6579 19.7304 22.6433 19.7755 22.6567 19.8167L26.1289 30.5033C26.1589 30.5954 26.0534 30.672 25.975 30.6151L16.8845 24.0104C16.8495 23.985 16.802 23.985 16.767 24.0104L7.67645 30.6151C7.59808 30.672 7.49263 30.5954 7.52256 30.5033L10.9948 19.8167C11.0082 19.7755 10.9936 19.7304 10.9585 19.7049L1.86799 13.1003C1.78962 13.0433 1.82989 12.9194 1.92677 12.9194H13.1633C13.2066 12.9194 13.245 12.8915 13.2584 12.8503L16.7306 2.16374Z" stroke="#6C7784" strokeWidth="3" />
          </svg>
          <p>{entry.score}</p>
        </div>
      </div>
    )

    // anime
    if (format === 'anime') {
      let studio
      let animeStatus

      if (entry.media.studios.edges[0]) {
        studio = <a href={entry.media.studios.edges[0].node.siteUrl} target="_blank" rel="noreferrer" className="studio">{entry.media.studios.edges[0].node.name}</a>
      } else {
        studio = null
      }

      if (entry.media.status.toLowerCase() === 'not_yet_released') {
        animeStatus = 'Unreleased'
      } else {
        animeStatus = entry.media.status.replaceAll('_', ' ').toLowerCase()
      }

      return (
        <div css={styles}>
          <a href={entry.media.siteUrl} target="_blank" rel="noreferrer" className="image-cont">
            <LazyLoadImage
              src={entry.media.coverImage.large}
              alt={title.toLowerCase()}
              effect="opacity"
            />
          </a>

          <div className="info">
            <div className="main-info">
              <h1>{title}</h1>
              {studio}
            </div>

            <div className="sub-info">
              {status === 'paused' || status === 'current' ? <CurrentProgress /> : <Rating />}

              <div className="sep" />

              <div className="right">
                <h2 style={{ textTransform: 'capitalize' }}>{animeStatus}</h2>
                <h2>{entry.media.format.replaceAll('_', ' ').toUpperCase()}</h2>
                <h2>{entry.media.seasonYear ? entry.media.seasonYear : '-'}</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // manga
    return (
      <div css={styles}>
        <a href={entry.media.siteUrl} target="_blank" rel="noreferrer" className="image-cont">
          <LazyLoadImage
            src={entry.media.coverImage.large}
            alt={title.toLowerCase()}
            effect="opacity"
          />
        </a>

        <div className="info">
          <div className="main-info">
            <h1>{title}</h1>
            <a href={entry.media.staff.edges[0].node.siteUrl} target="_blank" rel="noreferrer" className="studio">{entry.media.staff.edges[0].node.name.full}</a>
          </div>

          <div className="sub-info">
            {status === 'paused' || status === 'current' ? <CurrentProgress /> : <Rating />}

            <div className="sep" />

            <div className="right">
              <h2 style={{ textTransform: 'capitalize' }}>{entry.media.status.toLowerCase()}</h2>
              <h2>{entry.media.format.replaceAll('_', ' ').toUpperCase()}</h2>
              <h2>{entry.media.startDate.year}</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
