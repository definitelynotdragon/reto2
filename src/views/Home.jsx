import React, { Component } from 'react'

import AppLoading from '../components/AppLoading'
import PostList from '../components/PostList'

// import simulatedResponse from '../constants/repos.json'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: true
    }
  }

  componentDidMount () {
    const hola = async () => {
      this.setState({
        loading: true
      })

      const token = window.sessionStorage.getItem('authorization')

      const response = await window.fetch('https://api.github.com/users/kodemia/repos', {
        headers: { authorization: token }
      })

      const payload = await response.json()
      // const payload = simulatedResponse

      const posts = payload.map((repos) => ({
        id: repos.id,
        name: repos.name,
        fullName: repos.full_name,
        owner: repos.owner.login
      }))

      // console.log(posts)

      this.setState({
        posts,
        loading: false
      })
    }

    hola().then()
  }

  render () {
    if (this.state.loading) return <AppLoading />

    return <PostList list={this.state.posts} />
  }
}

export default Home
