/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useRef, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import colors from '../../assets/general/colors'

// for username existence checking
const USER_BY_NAME = gql`
  query ($username: String!) {
    User(name: $username) {
      name
    }
  }
`

// for random user
const USER_BY_ID = gql`
  query ($id: Int!) {
    User(id: $id) {
      name
    }
  }
`

function InputSection() {
  const styles = css`
    .desc {
      font-size: 0.9rem;
      font-family: 'Overpass', sans-serif;
      font-weight: 400;
      color: ${colors.primaryAccent};   
      margin-bottom: 7px;
    }

    .search-cont {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;

      input {
        background: #151f2e;
        border: none;
        color: #c0c4cc;
        font-family: 'Overpass', sans-serif;
        font-size: 1rem;
        font-weight: 400px;
        padding-left: 10px;
        height: 42px;
        width: 300px;
        border-radius: 4px;
      }

      button {
        height: 42px;
        width: 42px;
        background: #151f2e;
        padding: 8px;
        border-radius: 4px;
        margin-left: 6px;
        cursor: pointer;
        border: none;

        &:hover {
          .search-icon {
            fill: #d878cb;
          }

          /* ::focus {
            border: none;
          } */
        }
      }
    }

    .random {
      margin-top: 20px;
      margin-left: 2px;
      display: flex;
      width: 200px;
      align-items: center;

      button {
        background: none;
        border: none;
        color: #D878CBD4;
        text-transform: uppercase;
        font-weight: 600;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 1rem;
        cursor: pointer;
      }

      .loading-icon {
        height: 18px;
        width: 23px;
      }
    }

    .search-icon {
      margin: 2px;
      fill: #c0c4cc;
      transition: fill 0.3s ease;
    }

    .loading-icon {
      width: 100%;
      height: 100%;
      fill: white;
    }

    .error {
      margin-top: 10px;
      margin-left: 10px;
      min-height: 20px;

      p {
      color: #f95959;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      }
    }

    @media (min-width: 1000px) {
      margin: 50px 0 0 130px;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
      padding: 60px 0 0 50px;
    }

    @media (min-width: 640px) and (max-width: 800px) {
      padding: 60px 0 0 30px;

      .search-cont input {
        width: 250px;
      }
    }

    @media (max-width: 640px) {
      padding-top: 30px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .desc {
        font-size: 1em;
      }

      .random {
        margin-top: 10px;
        align-items: center;
        flex-direction: column;
        min-height: 35px;
      }

      .error {
        margin: 5px 0 0 0;
      }

      .search-cont {
        width: 90%;
        display: flex;
        justify-content: center;
        
        input {
          flex: 1;
          max-width: 400px;
          height: 45px;
          font-size: 1.1em;
        }
        
        button {
          height: 45px;
          width: 45px;
        }
      }
    }
  `

  // react-router alternaive to brower's history
  const history = useHistory()

  // always contains current input box value
  const inputValue = useRef('')

  // set after checking input or queries
  const [inputError, setInputError] = useState('')

  // function to handle gql errors
  const handleErrors = (e) => {
    if (e.graphQLErrors) {
      e.graphQLErrors.forEach((error) => {
        if (error.status === 404) {
          setInputError('Huh. That user doesn\'t exist')
        } else if (error.status === 400) {
          console.log('400 error')
        }
      })
    } else {
      e.networkErrors.forEach((error) => {
        console.log(error, error.status)
      })
    }
  }

  // function to redirect after user is brought in
  const handleRedirect = (name) => {
    history.push(`/${name}`)
  }

  // function to bring in user data from anilist
  const [getUser, { data: userData, loading }] = useLazyQuery(USER_BY_NAME, {
    onError: handleErrors,
    onCompleted: () => handleRedirect(userData.User.name.toLowerCase()),
  })

  // function to bring in random user from anilist
  const [getRandUser, { data: randData, loading: randUserLoading }] = useLazyQuery(USER_BY_ID, {
    onCompleted: () => handleRedirect(randData.User.name.toLowerCase()),
  })

  // validate inputValue before querying
  const checkInput = () => {
    if (inputValue.current === '') {
      setInputError('No name. No page ¯\\_(ツ)_/¯')
    } else if (inputValue.current.includes(' ')) {
      setInputError('No spaces allowed ಠ_ಠ')
    } else {
      getUser({
        variables: {
          username: inputValue.current,
        },
      })
    }
  }

  // random btn click query sender
  const handleRandom = () => {
    const userId = Math.floor(Math.random() * (160 - 40 + 1) + 40)

    getRandUser({
      variables: {
        id: userId,
      },
    })
  }

  const searchIcon = (
    <svg
      className="search-icon"
      css={styles.searchIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587zM202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
      />
    </svg>
  )

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
      <div className="desc">
        <p>Enter your anilist username</p>
      </div>

      <div className="search-cont">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => { inputValue.current = e.target.value }}
          onKeyPress={(e) => ((e.code === 'Enter') ? checkInput() : null)}
        />
        <button type="button" onClick={checkInput} disabled={loading}>{loading ? loadingIcon : searchIcon}</button>
      </div>

      <div className="error" style={(inputError !== ' ') ? { opacity: 1 } : { opacity: 1 }}>
        <p>{inputError}</p>
      </div>

      <div className="random">
        <button type="button" onClick={handleRandom}>random list</button>
        {randUserLoading ? loadingIcon : null}
      </div>
    </div>
  )
}

export default InputSection
