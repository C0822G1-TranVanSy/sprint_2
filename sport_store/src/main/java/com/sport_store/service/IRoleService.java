package com.sport_store.service;

import com.sport_store.entity.account.Role;
import com.sport_store.entity.account.RoleName;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(RoleName name);

}
