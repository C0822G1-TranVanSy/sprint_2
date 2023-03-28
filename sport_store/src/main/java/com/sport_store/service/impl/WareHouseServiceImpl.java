package com.sport_store.service.impl;

import com.sport_store.entity.warehouse.Warehouse;
import com.sport_store.reposiotry.IWareHouseRepository;
import com.sport_store.service.IWareHouseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class WareHouseServiceImpl implements IWareHouseService {
    @Autowired
    private IWareHouseRepository iWareHouseRepository;

    @Override
    public List<Warehouse> findAll() {
        return iWareHouseRepository.findAll();
    }
}
