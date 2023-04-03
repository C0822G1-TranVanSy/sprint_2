package com.sport_store.service.impl;

import com.sport_store.dto.request.ChangePasswordDto;
import com.sport_store.entity.account.Account;
import com.sport_store.reposiotry.IAccountRepository;
import com.sport_store.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;

    /**
     * Created by: SyTV
     * Date created: 27/02/2023
     *
     * @param username
     * @return account
     */
    @Override
    public Optional<Account> findByUsername(String username) {
        return iAccountRepository.findByUsername(username);
    }

    @Override
    public Optional<Account> findByUserId(Long accountId) {
        return iAccountRepository.findByUserId(accountId);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void save(Long accountId) {
        iAccountRepository.save(accountId);
    }

    @Override
    public void changePassword(ChangePasswordDto changePasswordDto) throws Exception {
        Account account = iAccountRepository.findByUserId(changePasswordDto.getAccountId()).orElse(null);
        if (account == null) {
            throw new Exception("Account null");
        }
        account.setPassword(passwordEncoder.encode(changePasswordDto.getNewPass()));
        iAccountRepository.save(account);
    }

    /**
     * Created by: SyTV
     * Date created: 27/02/2023
     * Function: findByUserName
     *
     * @param username
     * @return true false
     */
    @Override
    public Boolean existsAccountByUsername(String username) {
        return iAccountRepository.existsAccountByUsername(username);
    }

    /**
     * Created by: SyTV
     * Date created: 27/02/2023
     * Function: findByUserName
     *
     * @param email
     * @return true false
     */
    @Override
    public Boolean existsAccountByEmail(String email) {
        return iAccountRepository.existsAccountByEmail(email);
    }

    /**
     * Created by: SyTV
     * Date created: 27/02/2023
     * Function: findByUserName
     *
     * @param account
     *
     */
    @Override
    public void save(Account account) {
        iAccountRepository.save(account);
    }

    @Override
    public void changeAvatar(Long accountId, String ava) {
        iAccountRepository.changeAvatar(accountId,ava);
    }

}