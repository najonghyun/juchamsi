package com.inet.juchamsi.domain.token.dao;

import com.inet.juchamsi.domain.token.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("select t from Token t where t.user.loginId=:loginId")
    Optional<Token> findByUserLoginId(@Param("loginId") String loginId);

    @Modifying(clearAutomatically = true)
    @Query("update Token t set t.fcmToken=:fcmToken where t.user.loginId=:loginId")
    Optional<Void> updateToken(@Param("loginId") String loginId, @Param("fcmToken") String fcmToken);
}
