package com.inet.juchamsi.token.service;

import com.inet.juchamsi.domain.token.application.TokenService;
import com.inet.juchamsi.domain.token.dao.TokenRepository;
import com.inet.juchamsi.domain.token.dto.SaveTokenRequest;
import com.inet.juchamsi.domain.token.entity.Token;
import com.inet.juchamsi.domain.user.dao.UserRepository;
import com.inet.juchamsi.domain.user.entity.User;
import com.inet.juchamsi.domain.villa.dao.VillaRepository;
import com.inet.juchamsi.global.notification.application.FirebaseCloudMessageService;
import com.inet.juchamsi.global.notification.dto.request.FCMNotificationRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

import static com.inet.juchamsi.domain.user.entity.Approve.APPROVE;
import static com.inet.juchamsi.domain.user.entity.Grade.USER;
import static com.inet.juchamsi.global.common.Active.ACTIVE;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
public class TokenServiceTest {

    @Autowired
    TokenService tokenService;
    @Autowired
    FirebaseCloudMessageService FCMService;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    VillaRepository villaRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    @DisplayName("토큰 등록")
    void saveToken() {
        // given
        User targetUSer = insertUser();

        SaveTokenRequest request = SaveTokenRequest.builder()
                .loginId(targetUSer.getLoginId())
                .fcmToken("enVZRhGY3rfN8BhsUd0OR5:APA91bETGqKvYFwp01S2aSZTBm4ignS9aAaQmvfXFItzi2NiK4uVeO4qKcuh4LChlIVTd4ClxoSUK5O3vTdvWpUhIltqift0K6Y9bC9op29PWzuhf0bGnRHOoDBCF2rO5ufN0lkQiR-2")
                .build();

        // when
        Long id = tokenService.saveToken(request);

        // then
        Optional<Token> findToken = tokenRepository.findById(id);
        assertThat(findToken).isPresent();
    }

    @Test
    @DisplayName("푸시 알림 전송")
    void sendPushNotification() {
        // given
        User targetUser = insertUser();
        Token targetToken = insertToken(targetUser);
        String loginId = targetUser.getLoginId();

        FCMNotificationRequest request = FCMNotificationRequest.builder()
                .loginId(loginId)
                .title("주참시")
                .body("출차 15분 전입니다")
                .build();

        String result = FCMService.sendNotification(request);
        System.out.println(result);
    }

    private User insertUser() {
        User user = User.builder()
                .loginId("userid")
                .loginPassword(passwordEncoder.encode("userPw123!"))
                .phoneNumber("01012341234")
                .name("김주참")
                .totalMileage(5000)
                .grade(USER)
                .approve(APPROVE)
                .active(ACTIVE)
                .roles(Collections.singletonList("ADMIN"))
                .build();
        return userRepository.save(user);
    }

    private Token insertToken(User user) {
        Token token = Token.builder()
                .user(user)
                .fcmToken("enVZRhGY3rfN8BhsUd0OR5:APA91bETGqKvYFwp01S2aSZTBm4ignS9aAaQmvfXFItzi2NiK4uVeO4qKcuh4LChlIVTd4ClxoSUK5O3vTdvWpUhIltqift0K6Y9bC9op29PWzuhf0bGnRHOoDBCF2rO5ufN0lkQiR-2")
                .build();

        return tokenRepository.save(token);
    }
}
