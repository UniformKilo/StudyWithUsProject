package com.studywithus.web.controller.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.studywithus.config.jwt.JwtProperties;
import com.studywithus.domain.entity.member.Member;
import com.studywithus.domain.repository.jwt.JwtMemberRepository;
import com.studywithus.domain.service.auth.oauth.provider.GoogleUser;
import com.studywithus.domain.service.auth.oauth.provider.OAuthUserInfo;
import com.studywithus.web.controller.common.SuccessResult;
import com.studywithus.web.controller.jwt.dto.JwtLoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class JwtCreateController {

    private final JwtMemberRepository jwtMemberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/oauth/jwt/google")
    public SuccessResult jwtCreate(@RequestBody Map<String, Object> data, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("jwtCreate 실행됨");
        System.out.println(data.get("profileObj"));
        OAuthUserInfo googleUser =
                new GoogleUser((Map<String, Object>)data.get("profileObj"));

        System.out.println(googleUser);

        Optional<Member> memberOptional = jwtMemberRepository.findByEmail(googleUser.getProvider()+"_"+googleUser.getProviderId());
        Member memberEntity = Optional.of(memberOptional.orElseGet(Member::new)).get();

        if(memberEntity.getEmail() == null) {
            Member userRequest = Member.builder()
                    .email(googleUser.getProvider()+"_"+googleUser.getProviderId())
                    .password(bCryptPasswordEncoder.encode("Google"))
                    .nickname(googleUser.getEmail())
                    .provider(googleUser.getProvider())
                    .providerId(googleUser.getProviderId())
                    .roles("ROLE_USER")
                    .build();

            memberEntity = jwtMemberRepository.save(userRequest);
        }

        String jwtToken = JWT.create()
                .withSubject(memberEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))
                .withClaim("id", memberEntity.getId())
                .withClaim("username", memberEntity.getEmail())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        JwtLoginResponseDto responseDto = new JwtLoginResponseDto(memberEntity.getId(), memberEntity.getEmail(), memberEntity.getNickname());
        response.addHeader(JwtProperties.HEADER_STRING,JwtProperties.TOKEN_PREFIX + jwtToken);
        return new SuccessResult(responseDto, "login success", "success");
    }

}