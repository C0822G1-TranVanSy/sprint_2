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
    public Optional<Product> findById(Long productId) {
        return iProductRepository.findById(productId);
    }
}
