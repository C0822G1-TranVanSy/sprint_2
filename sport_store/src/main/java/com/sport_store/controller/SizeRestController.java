package com.sport_store.controller;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Size;
import com.sport_store.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/size")
@CrossOrigin("*")
public class SizeRestController {
    @Autowired
    ISizeService iSizeService;

    @GetMapping("/list")
    public ResponseEntity<List<Size>> getAllSize(){
        List<Size> sizeList= iSizeService.getAll();
        if(sizeList.isEmpty()){
            return new ResponseEntity<>(sizeList, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(sizeList,HttpStatus.OK);
    }
}
