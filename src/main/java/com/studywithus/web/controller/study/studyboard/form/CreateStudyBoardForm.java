package com.studywithus.web.controller.study.studyboard.form;

import com.studywithus.domain.entity.study.StudyBoardCategory;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class CreateStudyBoardForm {
    @NotBlank
    @Length(min=5, max=20)
    private String title;
    @NotBlank
    @Length(min=10, max=1000)
    private String content;
    @NotBlank
    private String studyBoardCategory;
}
