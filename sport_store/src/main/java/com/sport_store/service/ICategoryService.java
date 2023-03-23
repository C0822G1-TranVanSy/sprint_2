package com.sport_store.service;

import com.sport_store.entity.product.Category;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICategoryService {

    List<Category> findAllCategory();

    String getCategoryName( Long categoryId);
}
