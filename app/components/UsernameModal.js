import { setUsername, hideModal } from '../actions'

const UsernameModal = ({ post, dispatch }) => (
  <div>
    <p>Delete post {post.name}?</p>
    <button onClick={() => {
      dispatch(deletePost(post.id)).then(() => {
        dispatch(hideModal())
      })
    }}>
      Yes
    </button>
    <button onClick={() => dispatch(hideModal())}>
      Nope
    </button>
  </div>
)

export default connect(
  (state, ownProps) => ({
    post: state.postsById[ownProps.postId]
  })
)(UsernameModal)
