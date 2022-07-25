<script>
    var minus = $('.minus');
    var plus = $('.plus');
    var inputCount = $('input.item-count');
    var inputCountVal = inputCount.val();
    var count = 0;
    
    plus.on('click', function() {
        inputCount.val(inputCountVal++);
    });
</script>