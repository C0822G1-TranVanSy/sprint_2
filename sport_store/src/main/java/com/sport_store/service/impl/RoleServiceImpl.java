package com.sport_store.service.impl;

import com.sport_store.entity.account.Role;
import com.sport_store.entity.account.RoleName;
import com.sport_store.reposiotry.IRoleRepository;
import com.sport_store.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;


    @Override
    public Optional<Role> findByName(RoleName name) {
        return iRoleRepository.findByName(name);
    }
}
