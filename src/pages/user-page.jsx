/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect } from 'react'

import Footer from '../components/footer/footer'
import Header from '../components/user-page/Header'
import Content from '../components/user-page/Content'
import SettingsBar from '../components/user-page/SettingsBar'

import colors from '../assets/general/colors'

const queryString = require('query-string')

function UserPage() {
  const history = useHistory()
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

  // set state from url params
  useLayoutEffect(() => {
    const url = queryString.parse(history.location.search)

    if (url.format && url.format === 'manga') {
      setFormat(url.format)
    }
    if (url.view && url.view === 'list') {
      setViewType([url.view, true])
    }
    if (url.order && url.order === 'asc') {
      setOrderType(['ascending', true])
    }
    if (url.sort && ['alphabetic', 'ratings', 'popularity'].includes(url.sort)) {
      setSortType([url.sort.charAt(0).toUpperCase() + url.sort.slice(1), true])
    }
    if (url.status && ['completed', 'planning', 'paused'].includes(url.status)) {
      setStatus(url.status)
    }
  }, [])

  // set url when format changes
  useEffect(() => {
    const url = queryString.parse(history.location.search)

    if (format === 'manga') {
      url.format = format
      history.push(`${history.location.pathname}?${queryString.stringify(url)}`)
    } else {
      url.format = ''
      const params = queryString.stringify(url, { skipEmptyString: true })
      if (params !== '') {
        history.push(`${history.location.pathname}?${params}`)
      } else {
        history.push(`${history.location.pathname}`)
      }
    }
  }, [format])

  // set url when status changes
  useEffect(() => {
    const url = queryString.parse(history.location.search)

    if (status !== 'current') {
      url.status = status
      history.push(`${history.location.pathname}?${queryString.stringify(url)}`)
    } else {
      url.status = ''
      const params = queryString.stringify(url, { skipEmptyString: true })
      if (params !== '') {
        history.push(`${history.location.pathname}?${params}`)
      } else {
        history.push(`${history.location.pathname}`)
      }
    }
  }, [status])

  // set url when view changes
  useEffect(() => {
    const url = queryString.parse(history.location.search)

    if (viewType[0] !== 'grid') {
      [url.view] = viewType
      history.push(`${history.location.pathname}?${queryString.stringify(url)}`)
    } else {
      url.view = ''
      const params = queryString.stringify(url, { skipEmptyString: true })
      if (params !== '') {
        history.push(`${history.location.pathname}?${params}`)
      } else {
        history.push(`${history.location.pathname}`)
      }
    }
  }, [viewType])

  // set url when order changes
  useEffect(() => {
    const url = queryString.parse(history.location.search)

    if (orderType[0] !== 'descending') {
      url.order = 'asc'
      history.push(`${history.location.pathname}?${queryString.stringify(url)}`)
    } else {
      url.order = ''
      const params = queryString.stringify(url, { skipEmptyString: true })
      if (params !== '') {
        history.push(`${history.location.pathname}?${params}`)
      } else {
        history.push(`${history.location.pathname}`)
      }
    }
  }, [orderType])

  // set url when sort changes
  useEffect(() => {
    const url = queryString.parse(history.location.search)

    if (sortType[0] !== 'Most Recent') {
      [url.sort] = sortType
      history.push(`${history.location.pathname}?${queryString.stringify(url)}`)
    } else {
      url.sort = ''
      const params = queryString.stringify(url, { skipEmptyString: true })
      if (params !== '') {
        history.push(`${history.location.pathname}?${params}`)
      } else {
        history.push(`${history.location.pathname}`)
      }
    }
  }, [sortType])

  // change title to contain user's name
  useEffect(() => {
    document.title = `Anime Tracker - ${user}`
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
