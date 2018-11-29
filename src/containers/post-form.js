import React, {Component} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {createPost} from "../actions";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const formConfig = {
    form: 'createPostForm',
    fields: ['title', 'content', 'author'],
    validate: validate,
    initialValues: {author: "Moi"}
}

class PostForm extends Component {
    render() {
        const {fields, handleSubmit, errors} = this.props;

        return (
            <div>
                <h1>Nouveau post</h1>
                <form onSubmit={handleSubmit(this.createPost.bind(this))}>
                    <div className={`form-group ${fields.title.touched && fields.title.invalid ? 'has-danger' : ''}`}>
                        <label>Titre</label>
                        <input type="text" className="form-control" {...fields.title} />
                        <div>{fields.title.touched && errors.title}</div>
                    </div>
                    <div className={`form-group ${fields.content.touched && fields.content.invalid ? 'has-danger' : ''}`}>
                        <label>Description</label>
                        <input type="textarea" className="form-control" {...fields.content} />
                        <div>{fields.content.touched && errors.content}</div>
                    </div>
                    <div className={`form-group ${fields.author.touched && fields.author.invalid ? 'has-danger' : ''}`}>
                        <label>Auteur</label>
                        {/*{...fields.title} => defaultValue etc ...*/}
                        <input type="text" className="form-control" {...fields.author}/>
                        <div>{fields.author.touched && errors.author}</div>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={this.props.invalid}>Ajouter</button>
                    <Link to={"/"} className="button_space">
                        <button className="btn btn-danger" type="submit">Retour</button>
                    </Link>
                </form>
            </div>
        )
    }

    createPost(post) {
        this.props.createPost(post);
        browserHistory.push('/');
    }
}

function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title = 'Veuillez remplir le champ';
    }
    if (!values.content) {
        errors.content = 'Veuillez remplir le champ';
    }
    if (!values.author) {
        errors.author = 'Veuillez remplir le champ';
    }

    return errors;
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({createPost}, dispatch),
});

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(PostForm));
