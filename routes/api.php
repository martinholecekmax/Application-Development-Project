<?php

use Illuminate\Http\Request;

// Authentication using JWT
Route::post('signup', 'AuthController@signup');
Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');
Route::post('payload', 'AuthController@payload');

// List All Events
Route::get('events', [
    'uses' => 'EventController@index'
]);

// List Single Event
Route::get('event/{id}', [
    'uses' => 'EventController@show'
]);

// Create new Event
Route::post('event', [
    'uses' => 'EventController@store'
]);

// Update Event
Route::put('event/{id}', [
    'uses' => 'EventController@update'
]);

// Update Event
Route::patch('event/{id}', [
    'uses' => 'EventController@replace'
]);

// Delete Event
Route::delete('event/{id}', [
    'uses' => 'EventController@destroy'
]);