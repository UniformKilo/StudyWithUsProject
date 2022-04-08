package com.studywithus.controller.member.dto;

import com.studywithus.domain.entity.member.Member;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class SelectMemberResponseDto {
    @NotEmpty
    private String email;
    @NotEmpty
    private String nickname;
    @NotEmpty
    private String password;
    @NotEmpty
//        @DateTimeFormat(pattern = "yyyy-MM-dd")
//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private String bornDate;

    public SelectMemberResponseDto(){
    }
    @Builder
    public SelectMemberResponseDto(String email, String nickname, String password, String bornDate) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.bornDate = bornDate;
    }

    public Member toEntity(){
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .password(password)
                .bornDate(bornDate).build();
    }


}
