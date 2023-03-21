package com.sport_store.service;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<IProductDto> getAllProduct();

    Page<IProductDto> getAllProduct(Pageable pageable);

    Optional<Product> findById( Long productId);
}
