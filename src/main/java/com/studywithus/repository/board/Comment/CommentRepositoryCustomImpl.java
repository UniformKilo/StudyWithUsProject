package com.studywithus.repository.board.Comment;

import com.studywithus.domain.board.Comment;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class CommentRepositoryCustomImpl extends QuerydslRepositorySupport implements CommentRepositoryCustom {

    public CommentRepositoryCustomImpl() {
        super(Comment.class);
    }
}
