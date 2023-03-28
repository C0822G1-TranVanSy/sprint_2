package com.sport_store.controller;

import com.sport_store.dto.orders.*;
import com.sport_store.entity.order.Orders;
import com.sport_store.entity.order.PurchaseHistory;
import com.sport_store.service.IOrderService;
import com.sport_store.service.IProductService;
import com.sport_store.service.IPurchaseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderRestController {
    @Autowired
    private IOrderService iOrderService;

    @Autowired
    private IProductService iProductService;

    @Autowired
    private IPurchaseHistoryService iPurchaseHistoryService;

//    @PostMapping("/order")
//    public ResponseEntity<?> order(@RequestBody BillDto billDto){
//        System.out.println(billDto);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/detail/{accountId}")
    public ResponseEntity<Orders> findById(@PathVariable Long accountId) {
        Orders order = iOrderService.findById(accountId).orElse(null);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @GetMapping("/list/{orderId}")
    public ResponseEntity<List<ICartListDto>> getAllCart(@PathVariable Long orderId) {
        List<ICartListDto> cartListDtos = iPurchaseHistoryService.getAllProductByOrderId(orderId);
        if (cartListDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(cartListDtos,HttpStatus.OK);
    }

    @GetMapping("/total/{orderId}")
    public ResponseEntity<ITotalDto> getTotal(@PathVariable Long orderId) {
        ITotalDto totalDto = iPurchaseHistoryService.getTotal(orderId);
        if (totalDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(totalDto,HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity<?> order(@RequestBody OrderDto orderDto) {
        Orders order = iOrderService.findById(orderDto.getAccountId()).orElse(null);
        if (order == null) {
            iOrderService.createOrder(orderDto.getAccountId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/cart")
    public ResponseEntity<?> addToCart(@RequestBody CartDto cartDto) {
        iPurchaseHistoryService.createCartItem(cartDto.getProductId(), cartDto.getOrderId(), cartDto.getQuantity());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/updateQuantity")
    public ResponseEntity<?> updateQuantityCartItem(@RequestBody CartDto cartDto) {
        iPurchaseHistoryService.updateQuantityCartItem(cartDto.getProductId(), cartDto.getOrderId(), cartDto.getQuantity());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCartItemById(@RequestParam Long productId,@RequestParam Long orderId){
        PurchaseHistory purchaseHistory = iPurchaseHistoryService.findCartItemById(orderId,productId);
        if(purchaseHistory == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iPurchaseHistoryService.deleteCartItem(orderId,productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/cartLocal")
    public ResponseEntity<?> addCartLocal(@RequestParam Long orderId,@RequestBody List<CartListDto> cartListDtos) {
        for (CartListDto c: cartListDtos) {
//            iPurchaseHistoryService.createCartItem(c.getProductId(), c.getOrderId(), c.getQuantity());
            System.out.println(c);
        }
//        iPurchaseHistoryService.createCartItem(cartDto.getProductId(), cartDto.getOrderId(), cartDto.getQuantity());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
