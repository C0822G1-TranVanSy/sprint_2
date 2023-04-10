package com.sport_store.service.impl;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import com.sport_store.reposiotry.IProductRepository;
import com.sport_store.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    IProductRepository iProductRepository;

    @Override
    public List<IProductDto> getAllProduct() {
        return iProductRepository.getAllProduct();
    }

    @Override
    public Page<IProductDto> getAllProduct(Pageable pageable) {
        return iProductRepository.getAllProduct(pageable);
    }

    @Override
    public Page<IProductDto> searchAllProductByNameAndPrice(Pageable pageable, String name, String sm, String bg) {
        return iProductRepository.searchAllProductByNameAndPrice(pageable, name, sm, bg);
    }

    @Override
    public Page<IProductDto> searchAllProductByName(Pageable pageable, String name) {
        return iProductRepository.searchAllProductByName(pageable, name);
    }

    @Override
    public Optional<Product> findById(Long productId) {
        return iProductRepository.findById(productId);
    }

    @Override
    public void createProduct(String productName, String description, Double price, String avatar, Long categoryId) {
        iProductRepository.createProduct(productName,description,price,avatar,categoryId);
    }

    @Override
    public void updateProduct(String productName, String description, Double price, String avatar, Long categoryId, Long productId) {
        iProductRepository.updateProduct(productName,description,price,avatar,categoryId,productId);
    }

    @Override
    public void deleteProduct(Long productId) {
        iProductRepository.deleteProduct(productId);
    }

    @Override
    public Page<IProductDto> searchByCategory(Long categoryId, Pageable pageable) {
        return iProductRepository.searchByCategory(categoryId,pageable);
    }
}
