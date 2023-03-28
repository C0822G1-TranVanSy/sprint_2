package com.sport_store.service.impl;

import com.sport_store.entity.product.Size;
import com.sport_store.reposiotry.ISizeRepository;
import com.sport_store.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SizeServiceImpl implements ISizeService {
    @Autowired
    private ISizeRepository iSizeRepository;

    @Override
    public List<Size> getAll() {
        return iSizeRepository.findAll();
    }
}
