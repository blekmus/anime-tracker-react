/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import colors from '../../assets/general/colors'

function SettingsBar({
  view: [viewType, setViewType],
  order: [orderType, setOrderType],
  sort: [sortType, setSortType],
}) {
  let viewIcon
  let orderIcon
  let sortDeskIcon

  const [sortPopup, setSortPopup] = useState(false)

  const styles = css`
    height: 60px;
    position: relative;
    background-color: #151f2e;
    margin: 20px auto 40px auto;
    width: 85%;
    max-width: 1300px;
    padding: 0 20px 0 20px;
    border-radius: 4px;
    box-shadow: 0px 14px 7px -10px rgba(0, 0, 0, 0.20);
    display: flex;
    align-items: center;

    .btn {
      margin-right: auto;
      cursor: pointer;
      height: 40px;
      width: 150px;
      border-radius: 2px;
      background-color: #1f2b38;
      display: flex;
      align-items: center;
      border: none;
      padding: 5px 15px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #22303f;
      }

      p {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        color: #808a93;
        text-transform: capitalize;

        &.active {
          color: ${colors.primaryAccent};
        }
      }
    }

    .view-btn {
      svg {
        height: 75%;
        margin: auto 0 auto auto;
        fill: #808a93;
      }

    }

    .order-btn {
      svg {
        height: 65%;
        margin: auto 0 auto auto;
        fill: #808a93;
      }

    }

    .sort-btn {
      width: 160px;

      .desk-icon {
        height: 45%;
        width: 30px;
        margin: auto 0 auto auto;
        fill: #808a93;
      }

      .mob-icon {
        display: none;
      }
    }

    .sort-popup-cont {
      position: absolute;
      right: 0;
      top: 50px;

      .popup-card {
        z-index: 3;
        position: absolute;
        right: 0;
        top: 0;
        width: 160px;
        background-color: #1f2b38;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        padding: 15px 9px;
        row-gap: 12px;

        button {
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Overpass', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #6c7784;
          text-align: left;
          transition: color 0.3s ease;

          &:hover {
            color: ${colors.primaryAccent};
          }
        }
      }

      .popup-background {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background-color: none;
        z-index: 2;
      }
    }

    .right {
      display: flex;
      column-gap: 25px;
      position: relative;
    }

    /* laptop */
    @media (min-width: 800px) and (max-width: 1000px) {
      .view-btn {
        width: 130px;
      }

      .order-btn {
        width: 140px;
      }

      .right {
        column-gap: 15px;
      }
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;

      .btn {
        font-size: 0.9rem;
        padding: 5px 10px;

        p {
          font-size: 0.9rem;
        }
      }

      .view-btn {
        width: 110px;

        svg {
          height: 70%
        }
      }

      .order-btn {
        width: 120px;
      }

      .sort-btn {
        width: 130px;
      }

      .sort-popup-cont {
        .popup-card {
          width: 130px;

          button {
            font-size: 0.9rem;
          }
        }
      }

      .right {
        column-gap: 15px;
      }
    }

    /* mobile */
    @media (max-width: 640px) {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 92%;
      background: none;
      box-shadow: none;
      padding: 0;
      position: initial;

      .btn {
        width: 40px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          display: none;
        }

        svg {
          margin: 0;
          height: 50%;
        }
      }

      .sort-btn {
        .desk-icon {
          display: none;
        }

        .mob-icon {
          display: initial;
          fill: #808a93;
        }
      }

      .right {
        column-gap: 10px;
      }

      .sort-popup-cont {
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;

        .popup-background {
          background: linear-gradient(to top, #151f2ea2, #212a37a2);
        }

        .popup-card {
          background-color: #212a37;
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 80%;
          height: 35%;
          border-radius: 5px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-direction: column;
          max-width: 350px;
          row-gap: 0;

          &::before {
            content: 'Sort';
            position: absolute;
            left: 5px;
            top: -35px;
            font-weight: 700;
            font-family: 'Overpass', sans-serif;
            font-size: 1.4rem;
            color: white;
          }

          button {
            text-align: left;
            width: 100%;
            font-size: 1.3rem;
            font-weight: 400;
            padding: 0 20px;
          }

        }
      }
    }
  `

  // grid desktop icon
  if (viewType[0] === 'grid') {
    viewIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.673 271.673">
        <path d="M114.939,0H10.449C4.678,0,0,4.678,0,10.449v104.49c0,5.771,4.678,10.449,10.449,10.449h104.49
              c5.771,0,10.449-4.678,10.449-10.449V10.449C125.388,4.678,120.71,0,114.939,0z"
        />
        <path d="M261.224,0h-104.49c-5.771,0-10.449,4.678-10.449,10.449v104.49c0,5.771,4.678,10.449,10.449,10.449h104.49
              c5.771,0,10.449-4.678,10.449-10.449V10.449C271.673,4.678,266.995,0,261.224,0z"
        />
        <path d="M114.939,146.286H10.449C4.678,146.286,0,150.964,0,156.735v104.49c0,5.771,4.678,10.449,10.449,10.449h104.49
              c5.771,0,10.449-4.678,10.449-10.449v-104.49C125.388,150.964,120.71,146.286,114.939,146.286z"
        />
        <path d="M261.224,146.286h-104.49c-5.771,0-10.449,4.678-10.449,10.449v104.49c0,5.771,4.678,10.449,10.449,10.449h104.49
              c5.771,0,10.449-4.678,10.449-10.449v-104.49C271.673,150.964,266.995,146.286,261.224,146.286z"
        />
      </svg>
    )
  } else {
    viewIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189 189">
        <path d="M181.5,0H7.5C3.358,0,0,3.357,0,7.5v174c0,4.143,3.358,7.5,7.5,7.5h174c4.142,0,7.5-3.357,7.5-7.5V7.5
              C189,3.357,185.642,0,181.5,0z M63.484,150.688c0,4.143-3.358,7.5-7.5,7.5h-21.75c-4.142,0-7.5-3.357-7.5-7.5v-21.75
              c0-4.143,3.358-7.5,7.5-7.5h21.75c4.142,0,7.5,3.357,7.5,7.5V150.688z M63.484,102.43c0,4.143-3.358,7.5-7.5,7.5h-21.75
              c-4.142,0-7.5-3.357-7.5-7.5V80.68c0-4.143,3.358-7.5,7.5-7.5h21.75c4.142,0,7.5,3.357,7.5,7.5V102.43z M63.484,54.172
              c0,4.143-3.358,7.5-7.5,7.5h-21.75c-4.142,0-7.5-3.357-7.5-7.5v-21.75c0-4.143,3.358-7.5,7.5-7.5h21.75c4.142,0,7.5,3.357,7.5,7.5
              V54.172z M161.109,147.313H88.833c-4.142,0-7.5-3.357-7.5-7.5s3.358-7.5,7.5-7.5h72.276c4.142,0,7.5,3.357,7.5,7.5
              S165.251,147.313,161.109,147.313z M161.109,99.055H88.833c-4.142,0-7.5-3.357-7.5-7.5s3.358-7.5,7.5-7.5h72.276
              c4.142,0,7.5,3.357,7.5,7.5S165.251,99.055,161.109,99.055z M161.109,50.797H88.833c-4.142,0-7.5-3.357-7.5-7.5s3.358-7.5,7.5-7.5
              h72.276c4.142,0,7.5,3.357,7.5,7.5S165.251,50.797,161.109,50.797z"
        />
      </svg>
    )
  }

  // order desktop icon
  if (orderType[0] === 'ascending') {
    orderIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M374.176,110.386l-104-104.504c-0.006-0.006-0.013-0.011-0.019-0.018c-7.818-7.832-20.522-7.807-28.314,0.002
                            c-0.006,0.006-0.013,0.011-0.019,0.018l-104,104.504c-7.791,7.829-7.762,20.493,0.068,28.285
                            c7.829,7.792,20.492,7.762,28.284-0.067L236,68.442V492c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V68.442l69.824,70.162
                            c7.792,7.829,20.455,7.859,28.284,0.067C381.939,130.878,381.966,118.214,374.176,110.386z"
        />
      </svg>
    )
  } else {
    orderIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20
              c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285
              l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018
              l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z"
        />
      </svg>
    )
  }

  // sort desktop icon
  if (sortPopup) {
    sortDeskIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="desk-icon">
        <path d="M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27
                                L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832
                                c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"
        />
      </svg>
    )
  } else {
    sortDeskIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="desk-icon">
        <path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782
                                c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296
                                c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"
        />
      </svg>
    )
  }

  // sort mobile icon
  const sortMobIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998" className="mob-icon">
      <path d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847
                                c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331
                                c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"
      />
      <path d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847
                                c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906
                                c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"
      />
    </svg>
  )

  // sort mobile popup card
  const sortPopupCard = (
    <div className="sort-popup-cont">
      <div className="popup-card">
        <button
          type="button"
          onClick={() => { setSortType(['Most Recent', true]); setSortPopup(false) }}
          style={sortType[0] === 'Most Recent' ? { color: 'white', cursor: 'default' } : null}
        >
          Most Recent
        </button>

        <button
          type="button"
          onClick={() => {
            setSortType(['Alphabetic', true])
            setSortPopup(false)
          }}
          style={sortType[0] === 'Alphabetic' ? { color: 'white', cursor: 'default' } : null}
        >
          Alphabetic
        </button>

        <button
          type="button"
          onClick={() => {
            setSortType(['Ratings', true])
            setSortPopup(false)
          }}
          style={sortType[0] === 'Ratings' ? { color: 'white', cursor: 'default' } : null}
        >
          Ratings
        </button>

        <button
          type="button"
          onClick={() => { setSortType(['Popularity', true]); setSortPopup(false) }}
          style={sortType[0] === 'Popularity' ? { color: 'white', cursor: 'default' } : null}
        >
          Popularity
        </button>
      </div>
      <div
        className="popup-background"
        onClick={() => setSortPopup(false)}
        role="switch"
        aria-checked={false}
        tabIndex={0}
        aria-label="popup close"
      />
    </div>
  )

  return (
    <div css={styles}>
      <button className="view-btn btn" onClick={viewType[0] === 'grid' ? () => setViewType(['list', true]) : () => setViewType(['grid', true])} type="button">
        <p className={viewType[1] ? 'active' : null}>{viewType[1] ? viewType[0] : 'View'}</p>
        {viewIcon}
      </button>

      <div className="right">
        <button className="order-btn btn" onClick={orderType[0] === 'ascending' ? () => setOrderType(['descending', true]) : () => setOrderType(['ascending', true])} type="button">
          <p className={orderType[1] ? 'active' : null}>{orderType[1] ? orderType[0] : 'Order'}</p>
          {orderIcon}
        </button>

        <button className="sort-btn btn" type="button" onClick={() => setSortPopup(true)}>
          <p className={sortType[1] ? 'active' : null}>{sortType[1] ? sortType[0] : 'Sort'}</p>
          {sortMobIcon}
          {sortDeskIcon}
        </button>

        {sortPopup ? sortPopupCard : null}
      </div>
    </div>
  )
}

SettingsBar.propTypes = {
  view: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
      ),
      PropTypes.func,
    ]),
  ).isRequired,

  order: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
      ),
      PropTypes.func,
    ]),
  ).isRequired,

  sort: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
      ),
      PropTypes.func,
    ]),
  ).isRequired,
}

export default SettingsBar
