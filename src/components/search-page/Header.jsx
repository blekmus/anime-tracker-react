/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

function Header() {
  const styles = css`
    .title {
      padding-bottom: 10px;

      h1 {
        font-size: 4.4rem;
        color: white;
        font-family: 'Overpass', sans-serif;
        font-weight: 600;
      }
    }

    .desc {
      color: #8596a5;
      max-width: 350px;

      p {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 1.3rem;
        font-weight: 400;
        word-spacing: 30%;
      }
    }

    .line {
      background: #8596a5;
      height: 4px;
      border-radius: 50px;
      width: 100px;
      margin-top: 10px;
    }

    @media (min-width: 1000px) {
      padding: 110px 0 0 130px;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
      padding: 90px 0 0 50px;
    }

    @media (min-width: 640px) and (max-width: 800px) {
      padding: 80px 0 0 30px;

      .title h1 {
        font-size: 3.6rem;
      }

      .desc p {
        font-size: 1.2rem;
      }
    }

    @media (max-width: 640px) {
      padding: 30px 20px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        padding-bottom: 5px;

        h1 {
          font-size: 3.6rem;
        }
      }

      .desc {
        p {
          text-align: center;
          font-size: 1.1rem;
        }
      }

      .line {
        width: 40%;
      }
    }
  `

  return (
    <div css={styles}>
      <div className="title">
        <h1>Sup!</h1>
      </div>
      <div className="desc">
        <p>Show off your anime list with a touch of eye candy</p>
      </div>
      <div className="line" />
    </div>
  )
}

export default Header
