export default custom = {
    "components": {
        "Button": {
            "meta": {},
            "appearances": {
                "filled": {
                    "mapping": {},
                    "variantGroups": {
                        "status": {
                            "primary": {
                                // "backgroundColor": 'red',
                                'borderColor': 'transparent',
                                'textColor': 'color-basic-1000',
                            }
                        },
                    }
                }
            }
        },
        "BottomNavigation": {
            "appearances": {
                "default": {
                    "mapping": {
                        "backgroundColor": "background-basic-tabbar",
                    }
                },
            }
        },
        "TopNavigation": {
            "meta": {
                "variantGroups": {
                    "alignment": {
                        "center": {
                            "default": true
                        },
                        "start": {
                            "default": false
                        }
                    }
                }
            }
        },
        "StatusBar": {
            "meta": {
                "scope": "mobile",
                "parameters": {
                    "barStyle": {
                        "type": "string"
                    },
                    "backgroundColor": {
                        "type": "string"
                    }
                },
                "appearances": {
                    "default": {
                        "default": true
                    }
                },
                "variantGroups": {},
                "states": {}
            },
            "appearances": {
                "default": {
                    "mapping": {
                        "barStyle": "dark-content",
                        "backgroundColor": "background-basic-color-2"
                    }
                }
            }
        },

        "SafeAreaLayout": {
            "meta": {
                "scope": "mobile",
                "parameters": {
                    "backgroundColor": {
                        "type": "string"
                    }
                },
                "appearances": {
                    "default": {
                        "default": true
                    }
                },
                "variantGroups": {
                    "insets": {
                        "top": {
                            "default": false
                        },
                        "bottom": {
                            "default": false
                        }
                    }
                },
                "states": {}
            },
            "appearances": {
                "default": {
                    "mapping": {},
                    "variantGroups": {
                        "position": {
                            "top": {
                                "backgroundColor": "background-basic-color-1"
                            },
                            "bottom": {
                                "backgroundColor": "background-basic-tabbar"
                            }
                        }
                    }
                }
            }
        },
        "TopNavigationAction": {
            "appearances": {
                "default": {
                    "mapping": {
                        "iconWidth": 24,
                        "iconHeight": 24,
                        "iconMarginHorizontal": 0,
                    }
                },
            }
        },
        "Input": {
            "appearances": {
                "default": {
                    "mapping": {
                        "textFontFamily": "text-font-family",
                        "labelMarginBottom": 12,
                        "labelFontSize": 14,
                        "labelFontWeight": "bold",
                        "labelLineHeight": "text-label-line-height",
                        "labelFontFamily": "text-font-family",
                        "captionFontSize": "900",
                    },
                    "variantGroups": {
                        "status": {
                            "basic": {
                                "borderColor": "transparent",
                                "backgroundColor": "background-basic-color-2",
                                "textColor": "text-basic-color",
                                "labelColor": "text-basic-color",
                                "captionColor": "text-hint-color",
                                "placeholderColor": "text-hint-color",
                                "iconTintColor": "text-hint-color",
                                "captionIconTintColor": "text-hint-color",
                                "state": {
                                    "focused": {
                                        // "borderColor": "transparent",
                                        "borderColor": "color-primary-default",
                                        "backgroundColor": "background-basic-color-1",
                                        "iconTintColor": "text-primary-color"
                                    },
                                    // "disabled": {
                                    //     "borderColor": "border-basic-color-4",
                                    //     "backgroundColor": "background-basic-color-2",
                                    //     "textColor": "text-disabled-color",
                                    //     "labelColor": "text-disabled-color",
                                    //     "captionColor": "text-disabled-color",
                                    //     "placeholderColor": "text-disabled-color",
                                    //     "iconTintColor": "text-disabled-color",
                                    //     "captionIconTintColor": "text-disabled-color"
                                    // }
                                }
                            },
                        },
                    }
                }
            }
        },
        "Select": {
            "appearances": {
                "default": {
                    "mapping": {
                        "paddingHorizontal": 8,
                        "iconWidth": 24,
                        "iconHeight": 24,
                        "iconMarginHorizontal": 8,
                        "placeholderMarginHorizontal": 8,
                        "textMarginHorizontal": 8,
                        "textFontFamily": "text-font-family",

                        "labelMarginBottom": 12,
                        "labelFontSize": 14,
                        "labelFontWeight": "bold",
                    },
                    "variantGroups": {
                        "status": {
                            "basic": {
                                "borderColor": "border-basic-color-4",
                                "backgroundColor": "background-basic-color-2",
                                "textColor": "text-basic-color",
                                "labelColor": "text-basic-color",
                                "placeholderColor": "text-hint-color",
                                "iconTintColor": "text-hint-color",
                                "state": {
                                    "focused": {
                                        "borderColor": "color-primary-default-border",
                                        "backgroundColor": "background-basic-color-1",
                                    },
                                    "active": {
                                        "borderColor": "color-primary-default-border",
                                        "backgroundColor": "background-basic-color-1"
                                    },
                                }
                            },
                        }
                    }
                }
            },
        },
        "CheckBox": {
            "meta": {
                "scope": "all",
                "parameters": {
                    "width": {
                        "type": "number"
                    },
                    "height": {
                        "type": "number"
                    },
                    "borderWidth": {
                        "type": "number"
                    },
                    "borderRadius": {
                        "type": "number"
                    },
                    "borderColor": {
                        "type": "string"
                    },
                    "backgroundColor": {
                        "type": "string"
                    },
                    "textMarginHorizontal": {
                        "type": "number"
                    },
                    "textColor": {
                        "type": "string"
                    },
                    "textFontFamily": {
                        "type": "string"
                    },
                    "textFontSize": {
                        "type": "number"
                    },
                    "textFontWeight": {
                        "type": "string"
                    },
                    "textLineHeight": {
                        "type": "number"
                    },
                    "iconWidth": {
                        "type": "number"
                    },
                    "iconHeight": {
                        "type": "number"
                    },
                    "iconTintColor": {
                        "type": "string"
                    },
                    "outlineWidth": {
                        "type": "number"
                    },
                    "outlineHeight": {
                        "type": "number"
                    },
                    "outlineBorderRadius": {
                        "type": "number"
                    },
                    "outlineBackgroundColor": {
                        "type": "string"
                    }
                },
                "appearances": {
                    "default": {
                        "default": true
                    }
                },
                "variantGroups": {
                    "status": {
                        "primary": {
                            "default": false
                        },
                        "success": {
                            "default": false
                        },
                        "warning": {
                            "default": false
                        },
                        "danger": {
                            "default": false
                        },
                        "info": {
                            "default": false
                        },
                        "basic": {
                            "default": true
                        },
                        "control": {
                            "default": false
                        }
                    }
                },
                "states": {
                    "checked": {
                        "default": false,
                        "priority": 0,
                        "scope": "all"
                    },
                    "hover": {
                        "default": false,
                        "priority": 1,
                        "scope": "all"
                    },
                    "disabled": {
                        "default": false,
                        "priority": 2,
                        "scope": "all"
                    },
                    "active": {
                        "default": false,
                        "priority": 3,
                        "scope": "all"
                    },
                    "indeterminate": {
                        "default": false,
                        "priority": 4,
                        "scope": "all"
                    },
                    "focused": {
                        "default": false,
                        "priority": 5,
                        "scope": "all"
                    }
                }
            },
            "appearances": {
                "default": {
                    "mapping": {
                        "width": 20,
                        "height": 20,
                        "borderRadius": 3,
                        "borderWidth": "border-width",
                        "outlineWidth": 32,
                        "outlineHeight": 32,
                        "outlineBorderRadius": 6,
                        "outlineBackgroundColor": "transparent",
                        "textFontSize": 14,
                        "textFontWeight": "text-subtitle-2-font-weight",
                        "textLineHeight": "text-subtitle-2-line-height",
                        "textFontFamily": "text-font-family",
                        "textMarginHorizontal": 12,
                        "iconWidth": 12,
                        "iconHeight": 12,
                        "iconTintColor": "transparent"
                    },
                }
            }
        },
    },
}