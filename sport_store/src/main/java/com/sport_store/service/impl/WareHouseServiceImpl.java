package com.sport_store.service.impl;

import com.sport_store.dto.warehouse.IWareHouseDto;
import com.sport_store.entity.warehouse.Warehouse;
import com.sport_store.reposiotry.IWareHouseRepository;
import com.sport_store.service.IWareHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class WareHouseServiceImpl implements IWareHouseService {
    @Autowired
    private IWareHouseRepository iWareHouseRepository;

    @Override
    public List<Warehouse> findAll() {
        return iWareHouseRepository.findAll();
    }

    @Override
    public List<IWareHouseDto> getAll() {
        return iWareHouseRepository.getAll();
    }

    @Override
    public IWareHouseDto findByProductId(Long productId) {
        return iWareHouseRepository.findByProductId(productId);
    }
}
