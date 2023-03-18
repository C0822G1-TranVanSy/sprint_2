package com.sport_store.service.principle;

import com.sport_store.entity.account.Account;
import com.sport_store.reposiotry.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailService implements UserDetailsService {
    @Autowired
    private IAccountRepository iAccountRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = iAccountRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
        return AccountPrinciple.build(account);
    }
}
