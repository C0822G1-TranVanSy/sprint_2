package com.sport_store.service;

import com.sport_store.dto.warehouse.IWareHouseDto;
import com.sport_store.entity.warehouse.Warehouse;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IWareHouseService {
    List<Warehouse> findAll();

    List<IWareHouseDto> getAll();

    IWareHouseDto findByProductId(Long productId);
}
