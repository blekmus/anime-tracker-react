/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import gto from '../../assets/images/search-page/gto.jpg'
import noragami from '../../assets/images/search-page/noragami.jpg'
import tokyoGhoul from '../../assets/images/search-page/tokyo_ghoul.png'
import dragonball from '../../assets/images/search-page/dragon-ball.png'

function BackgroundImage() {
  const styles = {
    parentCont: css`
      @media (min-width: 1000px) {
        .desktop-img {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 40%;
          overflow: hidden;
          display: initial;

          img {
              height: 90%;
          }
        }
      }

      @media (min-width: 800px) and (max-width: 1000px) {
        .laptop-img {
          bottom: 20%;
          display: flex;
          position: absolute;
          right: 0;
          align-content: center;
          justify-content: center;
    
          img {
              height: 400px;
          }
        }
      }

      @media (min-width: 640px) and (max-width: 800px) {
        .tablet-img {
          bottom: 8%;
          display: flex;
          position: absolute;
          right: 0;
          align-content: center;
          justify-content: center;

          img {
              height: 500px;
          }
        }
      }

      @media (max-width: 640px) {
        .mobile-img {
          padding-top: 30px;
          width: 100%;
          height: 230px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            height: 100%;
          }
        }
      }
    `,

    image: css`
      display: none;
    `,
  }

  return (
    <div css={styles.parentCont}>
      <div css={styles.image} className="desktop-img">
        <img src={gto} alt="" />
      </div>
      <div css={styles.image} className="laptop-img">
        <img src={tokyoGhoul} alt="" />
      </div>
      <div css={styles.image} className="tablet-img">
        <img src={dragonball} alt="" />
      </div>
      <div css={styles.image} className="mobile-img">
        <img src={noragami} alt="" />
      </div>
    </div>
  )
}

export default BackgroundImage
