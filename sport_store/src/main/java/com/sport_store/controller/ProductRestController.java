package com.sport_store.controller;

import com.sport_store.dto.orders.ICartListDto;
import com.sport_store.dto.product.IBestProductDto;
import com.sport_store.dto.product.IProductDto;
import com.sport_store.dto.product.ProductDto;
import com.sport_store.dto.product.ProductDtoUpdate;
import com.sport_store.entity.product.Product;
import com.sport_store.service.IProductService;
import com.sport_store.service.IPurchaseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IPurchaseHistoryService iPurchaseHistoryService;

    @GetMapping("/list")
    public ResponseEntity<List<IProductDto>> getAllProduct(){
        List<IProductDto> productDtoList= iProductService.getAllProduct();
        if(productDtoList.isEmpty()){
            return new ResponseEntity<>(productDtoList, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productDtoList,HttpStatus.OK);
    }

    @PostMapping("/page1")
    public ResponseEntity<Page<IProductDto>> getAllProduct(@PageableDefault(size = 4) Pageable pageable,
                                                           @RequestParam("name") String name,
                                                           @RequestBody String[] list){
        Page<IProductDto> productDtoPage = null;
        List<Integer> list1 = new ArrayList<>();
        for (String s: list) {
            list1.add(Integer.valueOf(s.split("-")[0]));
            list1.add(Integer.valueOf(s.split("-")[1]));
        }
        if(list1.size() == 0){
            productDtoPage = iProductService.searchAllProductByName(pageable,name);
        }else {
            productDtoPage = iProductService.searchAllProductByNameAndPrice(pageable, name, Collections.min(list1).toString(), Collections.max(list1).toString());
        }
        if(productDtoPage.getContent().isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productDtoPage,HttpStatus.OK);
    }

//    @GetMapping("/page")
//    public ResponseEntity<Page<IProductDto>> getAllProduct(@PageableDefault(size = 4) Pageable pageable,
//                                                           @RequestParam("name") String name
//                                                        ){
//        Page<IProductDto> productDtoPage = null;
//        productDtoPage = iProductService.searchAllProductByName(pageable,name);
//        if(productDtoPage.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(productDtoPage,HttpStatus.OK);
//    }

    @GetMapping("/detail/{productId}")
    public ResponseEntity<?> findProductById(@PathVariable Long productId){
        Product product = iProductService.findById(productId).orElse(null);
        if(product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createProduct(@Validated @RequestBody ProductDto productDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(bindingResult.getAllErrors(),HttpStatus.BAD_REQUEST);
        }
        iProductService.createProduct(productDto.getProductName(),productDto.getDescription(),productDto.getPrice(),productDto.getAvatar(),productDto.getCategoryId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(@Validated @RequestBody ProductDtoUpdate productDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(bindingResult.getAllErrors(),HttpStatus.BAD_REQUEST);
        }
        iProductService.updateProduct(productDto.getProductName(),productDto.getDescription(),productDto.getPrice(),productDto.getAvatar(),productDto.getCategory().getCategoryId(),productDto.getProductId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProductById(@PathVariable Long productId){
        Product product = iProductService.findById(productId).orElse(null);
        if(product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iProductService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/searchCategory")
    public ResponseEntity<Page<IProductDto>> searchAllByCategory(@RequestParam("categoryId") Long categoryId,@PageableDefault(size = 4) Pageable pageable){
        Page<IProductDto> productDtoPage = null;
        if(categoryId == 0){
            productDtoPage =iProductService.getAllProduct(pageable);
        }else {
            productDtoPage = iProductService.searchByCategory(categoryId, pageable);
        }
        if(productDtoPage.isEmpty()){
            return new ResponseEntity<>(productDtoPage, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productDtoPage,HttpStatus.OK);
    }

    @GetMapping("/bestProduct")
    public ResponseEntity<Page<IBestProductDto>> getAllProduct(@PageableDefault(size = 4) Pageable pageable){
        Page<IBestProductDto> productDtos = null;
        productDtos = iPurchaseHistoryService.getBestProduct(pageable);
        if(productDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productDtos,HttpStatus.OK);
    }

}
