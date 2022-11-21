import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns'
import * as allLocal from 'date-fns/locale'
import styles from './Post.module.css';
import { useState } from 'react';

export function Post(props) {

  const [comments, setComments] = useState([
    "post muito bacana, hein?!"
  ]);
  const [newComment, setNewComment] = useState("");

  function handleCreateNewComment() {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('');
    setNewComment(event.target.value);
  }

  //função de deletar
  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(commentsWithoutDeletedOne);
  }

  //validando comentários.
  function handleNewCommentInvalid(){
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  //formatando data com a api Intl
  // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit',
  // }).format(props.publishedAt);
  //agora usando um biblioteca de formatDate.
  const publishedDateFormatted = format(props.publishedAt, "d LLLL 'às' HH:mm'h'", {
    locale: allLocal.ptBR
  })

  //colocar tempo relativo com base da data de publicação.
  const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
    locale: allLocal.ptBR,
    addSuffix: true
  })
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={props.author.avatarUrl} />
          <div className={styles.authoInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>
      <div className={styles.content}>
        {props.content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          if (line.type === 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>
          }
          if (line.type === 'links') {
            return <p key={line.content}>{line.content.map((link) => <a key={link} href='#'> {link}</a>)}</p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixa seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          value={newComment}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button 
            type='submit'
            disabled={newComment.length === 0}
          >
            comentar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}