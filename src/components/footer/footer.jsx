/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

import colors from '../../assets/general/colors'

function Footer({ page }) {
  const styles = {
    parentCont: css`
      display: flex;
      background-color: ${colors.footerBack};
      justify-content: center;
      align-items: center;
      bottom: 0;
      left: 0;
      width: 100%;
    `,

    userPage: css`
      height: 80px;
    `,

    searchPage: css`
      height: 10%;
      position: fixed;
    `,

    desc: css`
      font-family: 'Source Sans Pro', sans-serif;
      color: ${colors.primaryAccent};
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.4px;

      a {
        text-decoration: none;
        color: ${colors.secondaryAccent};
      }
    `,

    icon: css`
      fill: ${colors.primaryAccent};
      height: 11px;
      padding: 0 0.3rem;
    `,
  }

  return (
    <div css={[
      styles.parentCont,
      (page === 'user' ? styles.userPage : null),
      (page === 'search' ? styles.searchPage : null),
    ]}
    >
      <h2 css={styles.desc}>
        Made with
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.626 511.627" css={styles.icon}>
            <path d="M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136
                      c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414
                      c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562
                      c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162
                      c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837
                      c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144
                      s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951
                      z"
            />
          </svg>
        </span>
        by
        {' '}
        <a href="https://github.com/blekmus" rel="noreferrer" target="_blank">blekmus</a>
      </h2>
    </div>
  )
}

Footer.propTypes = {
  page: PropTypes.string.isRequired,
}

export default Footer
