/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import colors from '../../assets/general/colors'

const USER_STATS = gql`
query ($userName: String) { 
  User (name: $userName) {
    id
    statistics {
      anime {
        count
        meanScore
        standardDeviation
        episodesWatched
        minutesWatched
        statuses {
          minutesWatched
          status
          count
        }
        scores {
          score
          count
        }
      }

      manga {
        count
        meanScore
        chaptersRead
        volumesRead
        statuses {
          status
          chaptersRead
          count
        }
        scores {
          score
          count
        }
      }
    }
  }
}`

function Chart({ scores }) {
  const styles = css`
    display: grid;
    height: 100%;
    width: 100%;
    position: relative;
    justify-items: center;

    .desc {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: #7197d07d;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: -10px;
      text-align: center;
    }

    .chart-columns {
      height: 100%;
      width: 100%;

      display: grid;
      padding: 5px 5px 0 5px;

      .column {
        display: grid;
        grid-template-rows: auto 23px;

        .top {
          display: flex;
          justify-content: center;
          align-items: end;
        }

        .center {
          display: flex;
          justify-content: end;
          align-items: center;
          padding-bottom: 5px;
          flex-direction: column-reverse;

          .num {
            opacity: 0;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 0.9rem;
            font-weight: 700;
            color: white;
            padding-bottom: 5px;
            transition: opacity ease;
            transition-delay: 0.3s;
          }

          .line {
            width: 13px;
            border-radius: 50px;
            background-color: #A45B61;

            &:hover + p {
              opacity: 1;
              transition-delay: 0s;
            }
          }
        }

        .bottom {
          background-color: #1C2A3A;
          display: flex;
          justify-content: center;
          align-items: center;

          p {
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 1.05rem;
            font-weight: 600;
            color: #8D949C;
          }
        }
      }

      .start {
        margin-left: 10px;

        .bottom {
          border-radius: 3px 0 0 3px;
        }
      }

      .end {
        margin-right: 10px;

        .bottom {
          border-radius: 0 3px 3px 0;
        }
      }
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      .desc {
        top: -8px;
      }

      .chart-columns {
        padding: 10px 0 0 0;

        .column {
          .center {
            .line {
              width: 10px;
            }
          }

          .bottom {
            p {
              font-size: 1rem;
            }
          }
        }
      }
    }

    /* mobile */
    @media (max-width: 640px) {
      grid-template-rows: auto 13px;

      .desc {
        position: initial;
        padding-top: 3px;
        font-size: 0.8rem;
      }

      .chart-columns {
        padding: 0;

        .column {
          grid-template-rows: auto 20px;

          .center {
            .line {
              width: 9px;
            }

            .num {
              font-size: 0.8rem;
            }
          }

          .bottom {
            p {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  `

  const scoresSpread = [...scores]

  // max score count
  let maxCount = 0
  scoresSpread.forEach((entry) => {
    if (entry.count > maxCount) {
      maxCount = entry.count
    }
  })

  // sort the scores by score
  const sortedScores = scoresSpread.sort((a, b) => (a.score - b.score))

  // create each score bar
  const columns = sortedScores.map((entry) => (
    <div className="bar column" key={uuid()}>
      <div className="center">
        <div className="line" style={{ height: `${(entry.count / maxCount) * 100}%` }} />
        <p className="num">{entry.count}</p>
      </div>
      <div className="bottom">
        <p>{entry.score}</p>
      </div>
    </div>
  ))

  return (
    <div css={styles}>
      <div className="chart-columns" style={{ gridTemplateColumns: `repeat(${scores.length + 2}, 1fr)` }}>
        <div className="start column">
          <div className="center" />
          <div className="bottom" />
        </div>

        {columns}

        <div className="end column">
          <div className="center" />
          <div className="bottom" />
        </div>
      </div>
      <p className="desc">Titles Per Score</p>
    </div>
  )
}

function StatsCard({ visibility: setStatsPopup, user }) {
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
      width: 90%;
      max-width: 1300px;
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
            grid-template-rows: 1fr 1fr;
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

      .section-title {
        color: ${colors.primaryAccent};
        font-family: 'Overpass', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        margin-left: 8px;
      }

      .card-cont {
        overflow: hidden;
        height: 100%;
        background-color: #151F2E; 
        border-radius: 3px;
        padding: 13px 15px;

        display: grid;
        grid-template-areas: "sect1 sect2 sect3";
        grid-template-columns: 28% 44% 28%;

        .sub-sect-1,
        .sub-sect-3 {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .sep {
            height: 2px;
            background-color: #313A47;
            width: 100%;
          }

          .entry {
            display: flex;
            align-items: center;

            h1 {
              font-size: 1.17rem;
              font-family: 'Source Sans Pro', sans-serif;
              font-weight: 600;
              color: #8596A5;
            }

            h2 {
              margin-left: auto;
              font-size: 1.17rem;
              font-family: 'Source Sans Pro', sans-serif;
              font-weight: 600;
              color: ${colors.secondaryAccent};
            }
          }
        }

        .sub-sect-1 {
          grid-area: sect1;
          border-right: 2px #313A47 solid;
          
          h2 {
            padding-right: 15px;
          }

          h1 {
            padding-left: 5px;
          }
        }   

        .sub-sect-2 {
          grid-area: sect2;
        } 

        .sub-sect-3 {
          grid-area: sect3;

          border-left: 2px #313A47 solid;
          
          h2 {
            padding-right: 5px;
          }

          h1 {
            padding-left: 15px;
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

    /* laptop */
    @media (min-width: 800px) and (max-width: 1000px) {
      .section {
        .card-cont {
          grid-template-areas: 
            "sect1 sect2"
            "sect3 sect2";
          grid-template-columns: 40% 60%;
          grid-template-rows: 1fr 1fr;

          .sub-sect-1,
          .sub-sect-3 {
            .sep {
              display: none;
            }
          }

          .sub-sect-1 {
            padding-bottom: 10px;

            h2 {
              padding: 0 15px 0 5px;
            }

            h1 {
              padding: 0 0 0 5px;
            }
          }

          .sub-sect-3 {
            padding-top: 10px;
            border-left: none;
            border-top: 1px #313A47 solid;
            border-right: 2px #313A47 solid;

            h2 {
              padding: 0 15px 0 5px;
            }

            h1 {
              padding: 0 0 0 5px;
            }
          }
        }
      }
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      .section {
        .card-cont {
          padding: 10px;
          grid-template-areas: 
            "sect1 sect2"
            "sect3 sect2";
          grid-template-columns: 40% 60%;
          grid-template-rows: 1fr 1fr;

          .sub-sect-1,
          .sub-sect-3 {
            .sep {
              display: none;
            }

            .entry {
              h1, h2 {
                font-size: 1rem;
              }
            }
          }

          .sub-sect-1 {
            padding-bottom: 10px;

            h2 {
              padding: 0 10px 0 5px;
            }

            h1 {
              padding: 0 0 0 5px;
            }
          }

          .sub-sect-3 {
            padding-top: 10px;
            border-left: none;
            border-top: 1px #313A47 solid;
            border-right: 2px #313A47 solid;

            h2 {
              padding: 0 10px 0 5px;
            }

            h1 {
              padding: 0 0 0 5px;
            }
          }
        }
      }
    }

    /* mobile */
    @media (max-width: 640px) {
      .overlay-cont {
        width: 100%;

        .overlay {
          .scrollable {
            padding: 10px 0 15px 0;
          }
        }
      }

      .section {
        .card-cont {
          border-radius: 0px;
          padding: 5px 10px 10px 10px;
          grid-template-areas: 
            "sect1 sect3"
            "sect2 sect2";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 35% 65%;

          .sub-sect-1,
          .sub-sect-3 {
            .sep {
              display: none;
            }

            .entry {
              h1, h2 {
                font-size: 0.8rem;
              }
            }
          }

          .sub-sect-1 {
            padding-bottom: 5px;
            border-bottom: 2px #313A47 solid;
            border-right: 1px #313A47 solid;

            h2 {
              padding: 0 10px 0 0;
            }

            h1 {
              padding: 0;
            }
          }

          .sub-sect-3 {
            border-bottom: 2px #313A47 solid;
            border-left: 1px #313A47 solid;
            padding-bottom: 5px;

            h2 {
              padding: 0;
            }

            h1 {
              padding: 0 0 0 10px;
            }
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

  // request to bring in user's statistical data
  const { data: userData, loading } = useQuery(USER_STATS, {
    onError: handleErrors,
    variables: {
      userName: user,
    },
  })

  // stats sections and image cards
  const Content = () => {
    const animeData = userData.User.statistics.anime
    const mangaData = userData.User.statistics.manga

    const animeStats = (
      <>
        <div className="sub-sect sub-sect-1">
          <div className="entry">
            <h1>Total Anime:</h1>
            <h2>{animeData.count}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Episodes Watched:</h1>
            <h2>{animeData.episodesWatched}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Hours Watched:</h1>
            <h2>{Math.round(animeData.minutesWatched / 60)}</h2>
          </div>
        </div>
        <div className="sub-sect sub-sect-2">
          <Chart scores={animeData.scores} />
        </div>
        <div className="sub-sect sub-sect-3">
          <div className="entry">
            <h1>Mean Score:</h1>
            <h2>{animeData.meanScore}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Standard Deviation:</h1>
            <h2>{animeData.standardDeviation}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Days Planned:</h1>
            <h2>{Math.round(((animeData.statuses[1].minutesWatched / 60) / 24) * 10) / 10}</h2>
          </div>
        </div>
      </>
    )

    const mangaStats = (
      <>
        <div className="sub-sect sub-sect-1">
          <div className="entry">
            <h1>Total Manga:</h1>
            <h2>{mangaData.count}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Chapters Read:</h1>
            <h2>{mangaData.chaptersRead}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Volumes Read:</h1>
            <h2>{mangaData.volumesRead}</h2>
          </div>
        </div>
        <div className="sub-sect sub-sect-2">
          <Chart scores={mangaData.scores} />
        </div>
        <div className="sub-sect sub-sect-3">
          <div className="entry">
            <h1>Mean Score:</h1>
            <h2>{mangaData.meanScore}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Chapters Planned:</h1>
            <h2>{mangaData.statuses[0].chaptersRead}</h2>
          </div>
          <div className="sep" />
          <div className="entry">
            <h1>Total Completed:</h1>
            <h2>{mangaData.statuses[1].count}</h2>
          </div>
        </div>
      </>
    )

    return (
      <>
        <div className="section">
          <p className="section-title">Anime</p>
          <div className="card-cont">{animeStats}</div>
        </div>

        <div className="section">
          <p className="section-title">Manga</p>
          <div className="card-cont">{mangaStats}</div>
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
          <h1>Stats</h1>
          <button type="button" onClick={() => setStatsPopup(false)}>
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
        onClick={() => setStatsPopup(false)}
        role="switch"
        aria-checked={false}
        tabIndex={0}
        aria-label="popup close"
        onKeyPress={null}
      />
    </div>
  )
}

StatsCard.propTypes = {
  visibility: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}

Chart.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  ).isRequired,
}

export default StatsCard
