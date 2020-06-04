jQuery(function(){
    jQuery('#date_timepicker_start').datetimepicker({
        format:'Y-m-d',
        onShow:function(ct){this.setOptions({ minDate:0,maxDate:jQuery('#date_timepicker_end').val()?jQuery('#date_timepicker_end').val():false})},
        timepicker:false
    });

    jQuery('#date_timepicker_end').datetimepicker({
        format:'Y-m-d',
        onShow:function(ct){this.setOptions({minDate:jQuery('#date_timepicker_start').val()?jQuery('#date_timepicker_start').val():false})},
        timepicker:false
    });
});
