/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Header from '../components/search-page/Header'
import BackgroundImage from '../components/search-page/BackgroundImage'
import InputSection from '../components/search-page/InputSection'

import colors from '../assets/general/colors'
import Footer from '../components/footer/footer'

function SearchPage() {
  const styles = css`
    background-color: ${colors.background};
    height: 92vh;
  `

  return (
    <div css={styles}>
      <Header />
      <InputSection />
      <BackgroundImage />
      <Footer page="search" />
    </div>
  )
}

export default SearchPage
