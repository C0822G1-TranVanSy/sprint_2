package com.sport_store.service;

import com.sport_store.dto.request.ChangePasswordDto;
import com.sport_store.entity.account.Account;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUsername(String username);

    /**
     * Create by : NuongHT
     * Date create: 27/02/2023
     * Description: create method service of change password
     *
     */
    void save(Long accountId);

    void changePassword(ChangePasswordDto changePasswordDto) throws Exception;

    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail( String email);

    void save(Account account);

}
