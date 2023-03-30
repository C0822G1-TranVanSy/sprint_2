package com.sport_store.controller;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.dto.warehouse.IWareHouseDto;
import com.sport_store.entity.warehouse.Warehouse;
import com.sport_store.service.IWareHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse")
@CrossOrigin("*")
public class WareHouseRestController {
    @Autowired
    private IWareHouseService iWareHouseService;

    @GetMapping("/list")
    public ResponseEntity<List<IWareHouseDto>> getAll() {
        List<IWareHouseDto> warehouseList = iWareHouseService.getAll();
        if (warehouseList.isEmpty()) {
            return new ResponseEntity<>(warehouseList, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(warehouseList, HttpStatus.OK);
    }

    @GetMapping("/detail/{productId}")
    public ResponseEntity<IWareHouseDto> findByProductId(@PathVariable Long productId) {
        IWareHouseDto wareHouseDto = iWareHouseService.findByProductId(productId);
        if (wareHouseDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(wareHouseDto, HttpStatus.OK);
    }
}
