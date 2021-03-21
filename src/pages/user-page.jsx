/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Footer from '../components/footer/footer'
import Header from '../components/user-page/Header'
import Content from '../components/user-page/Content'
import SettingsBar from '../components/user-page/SettingsBar'

import colors from '../assets/general/colors'

function UserPage() {
  const { user } = useParams()

  const styles = css`
    background-color: ${colors.background};
    min-height: 100vh;

    .content-cont {
      min-height: 100vh;
    }
  `

  // anime / manga
  const [format, setFormat] = useState('anime')

  // current / completed / planning / paused
  const [status, setStatus] = useState('current')

  // grid / list
  const [viewType, setViewType] = useState(['grid', false])

  // ascending / descending
  const [orderType, setOrderType] = useState(['descending', false])

  // Most Recent / Alphabetic / Ratings / Popularity
  const [sortType, setSortType] = useState(['Most Recent', false])

  // change title to contain user's name
  useEffect(() => {
    document.title = `Anime Stats - ${user}`
  }, [])

  return (
    <div css={styles}>
      <Header user={user} format={[format, setFormat]} status={[status, setStatus]} />
      <SettingsBar view={[viewType, setViewType]} order={[orderType, setOrderType]} sort={[sortType, setSortType]} />
      <div className="content-cont">
        <Content user={user} format={format} status={status} view={viewType[0]} order={orderType[0]} sort={sortType[0]} />
      </div>
      <Footer page="user" />
    </div>
  )
}

export default UserPage
