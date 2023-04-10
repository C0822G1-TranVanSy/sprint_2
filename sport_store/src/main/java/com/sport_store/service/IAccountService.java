package com.sport_store.service;

import com.sport_store.dto.request.ChangePasswordDto;
import com.sport_store.entity.account.Account;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUsername(String username);

    Optional<Account> findByUserId(Long accountId);

    void save(Long accountId);

    void changePassword(ChangePasswordDto changePasswordDto) throws Exception;

    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail( String email);

    void save(Account account);

    void changeAvatar(Long accountId, String ava);

    void changeInfo(Long accountId,String name,
                    String phoneNumber,String address,String email);

}
