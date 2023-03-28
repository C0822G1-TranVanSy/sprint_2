package com.sport_store.service;

import com.sport_store.entity.warehouse.Warehouse;

import java.util.List;

public interface IWareHouseService {
    List<Warehouse> findAll();
}
