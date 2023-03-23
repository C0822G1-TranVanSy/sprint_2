package com.sport_store.service.impl;

import com.sport_store.entity.product.Category;
import com.sport_store.reposiotry.ICategoryRepository;
import com.sport_store.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Override
    public List<Category> findAllCategory() {
        return iCategoryRepository.findAllCategory();
    }

    @Override
    public String getCategoryName(Long categoryId) {
        return iCategoryRepository.getCategoryName(categoryId);
    }
}
