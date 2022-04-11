package com.studywithus.domain.entity.study;

import com.studywithus.domain.entity.BaseConstructorEntity;
import com.studywithus.domain.entity.member.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="study_board_comment")
@Getter
@Setter
@NoArgsConstructor
public class StudyBoardComment extends BaseConstructorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="study_board_comment_id")
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_board_id")
    private StudyBoard studyBoard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @OneToMany(mappedBy = "studyBoardComment", cascade = CascadeType.ALL)
    private List<StudyBoardCommentReport> studyBoardCommentReports = new ArrayList<>();

    @OneToMany(mappedBy = "studyBoardComment", cascade = CascadeType.ALL)
    private List<StudyBoardCommentRecommend> studyBoardCommentRecommends = new ArrayList<>();


    public StudyBoardComment(String content, StudyBoard studyBoard, Member member) {
        this.content = content;
        this.studyBoard = studyBoard;
        this.member = member;
    }
}
