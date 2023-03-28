package com.sport_store.reposiotry;

import com.sport_store.entity.warehouse.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWareHouseRepository extends JpaRepository<Warehouse, Long> {
}
