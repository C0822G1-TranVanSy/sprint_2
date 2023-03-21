package com.sport_store.controller;

import com.sport_store.dto.product.BillDto;
import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import com.sport_store.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private IProductService iProductService;

    @GetMapping("/list")
    public ResponseEntity<List<IProductDto>> getAllProduct(){
        List<IProductDto> productDtoList= iProductService.getAllProduct();
        if(productDtoList.isEmpty()){
            return new ResponseEntity<>(productDtoList, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productDtoList,HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<IProductDto>> getAllProduct(@PageableDefault(size = 3) Pageable pageable){
        Page<IProductDto> productDtoPage= iProductService.getAllProduct(pageable);
        if(productDtoPage.isEmpty()){
            return new ResponseEntity<>(productDtoPage, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productDtoPage,HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity<?> order(@RequestBody BillDto billDto){
        System.out.println(billDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/{productId}")
    public ResponseEntity<?> findProductById(@PathVariable Long productId){
        Product product = iProductService.findById(productId).orElse(null);
        if(product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
}
