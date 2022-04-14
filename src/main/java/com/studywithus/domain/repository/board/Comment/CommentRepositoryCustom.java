package com.studywithus.domain.repository.board.Comment;

import com.querydsl.core.Tuple;
import com.studywithus.domain.entity.board.Comment;
import com.studywithus.domain.entity.board.Post;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepositoryCustom {
    // 구현할 메서드 명세 작성
//    @Query("delete from Comment c where c.post_id =:post_id")
//    void deleteByPostId(Long post_id);
    List<Tuple> getComments(@Param("post_id") Long post_id);
    void deleteByCommentId(@Param("comment_id") Long comment_id);
}
