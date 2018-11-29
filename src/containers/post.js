import React, {Component} from 'react';
import PostContent from '../components/post-content';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readPost} from "../actions";

class Post extends Component {

    componentWillMount() {
        this.props.readPost(this.props.params.id);
    }

    renderPostContent() {
        const {post} = this.props;

        if (post) {
            return <PostContent post={this.props.post}/>;
        }
    }

    render() {
        return (
            <div>
                Post n° {this.props.params.id}
                {this.renderPostContent()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.activePost
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({readPost}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
