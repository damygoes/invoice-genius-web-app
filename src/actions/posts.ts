import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'
const fetchPosts = async () => {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return result.data
}

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts()
})

export { postsQueryOptions }
